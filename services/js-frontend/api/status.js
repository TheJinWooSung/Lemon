/**
 * Health / status helper endpoints for frontend.
 * Example: check if Flask backend is reachable.
 */

const express = require("express");
const axios = require("axios");
const router = express.Router();

const FLASK_BASE = process.env.FLASK_BASE || "http://localhost:5000";

router.get("/health", async (req, res) => {
  try {
    const resp = await axios.get(`${FLASK_BASE}/`);
    return res.json({ upstream: true, info: resp.data });
  } catch (err) {
    return res.json({ upstream: false, error: err.message });
  }
});

module.exports = router;
