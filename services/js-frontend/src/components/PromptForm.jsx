import React, { useState } from "react";
import axios from "axios";

/**
 * PromptForm - collects prompt and submits to backend.
 * Calls POST /api/image/generate
 */
export default function PromptForm({ onNewImage }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!prompt.trim()) return setError("Enter a prompt");
    setError(null);
    setLoading(true);

    try {
      const resp = await axios.post("/api/image/generate", { prompt });
      const data = resp.data;
      // data expected: { prompt, image_url }
      if (data.image_url) {
        onNewImage({ url: data.image_url, prompt: data.prompt });
      } else {
        setError("No image returned");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <textarea
        className="w-full p-3 border rounded"
        rows={3}
        placeholder="A dreamy sci-fi city at sunset, photorealistic — ultra detail"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        <small className="text-gray-500">
          Use commas to add variations. Keep prompts under ~200 chars for best results.
        </small>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
