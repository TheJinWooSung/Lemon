import React, { useState } from "react";
import PromptForm from "./components/PromptForm";
import ImageGrid from "./components/ImageGrid";

export default function App() {
  const [images, setImages] = useState([]);
  return (
    <main className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">AI-ImageForge</h1>
      <PromptForm onImages={setImages} />
      <ImageGrid images={images} />
    </main>
  );
}
