/**
 * Proxies/forwards image generation requests to Flask backend.
 * Also demonstrates a simple "create + poll" flow.
 *
 * For production, you may use a gateway instead of this proxy.
 */

const express = require("express");
const axios = require("axios");
const router = express.Router();

const FLASK_BASE = process.env.FLASK_BASE || "http://localhost:5000";

/**
 * POST /api/image/generate
 * Body: { prompt: string }
 * Forwards to Flask /api/v1/generate and returns the response.
 */
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const resp = await axios.post(`${FLASK_BASE}/api/v1/generate/`, { prompt }, { timeout: 120000 });
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("[proxy] generate error:", err?.response?.data || err.message);
    const status = err.response?.status || 500;
    return res.status(status).json({ error: err.response?.data || err.message });
  }
});

/**
 * POST /api/image/upscale
 * Body: { image_url: string }
 * Forwards to Flask upscale endpoint (placeholder)
 */
router.post("/upscale", async (req, res) => {
  try {
    const resp = await axios.post(`${FLASK_BASE}/api/v1/upscale/`, req.body);
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("[proxy] upscale error:", err?.response?.data || err.message);
    const status = err.response?.status || 500;
    return res.status(status).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
