import React, { useState, useEffect } from "react";
import PromptForm from "./components/PromptForm";
import ImageGrid from "./components/ImageGrid";
import axios from "axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [upstreamHealthy, setUpstreamHealthy] = useState(false);

  useEffect(() => {
    axios.get("/api/status/health").then(r => {
      setUpstreamHealthy(!!r.data.upstream);
    }).catch(() => setUpstreamHealthy(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI-ImageForge</h1>
        <p className="text-sm text-gray-600">
          Unlimited image generation — powered by Stable Diffusion. Upstream:{" "}
          <span className={upstreamHealthy ? "text-green-600" : "text-red-600"}>
            {upstreamHealthy ? "Flask OK" : "Offline"}
          </span>
        </p>
      </header>

      <PromptForm onNewImage={(img) => setImages(prev => [img, ...prev])} />
      <hr className="my-6" />
      <ImageGrid images={images} />
    </div>
  );
}
