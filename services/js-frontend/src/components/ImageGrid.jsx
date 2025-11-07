import React from "react";

/**
 * Simple grid to display returned images.
 * Each image object: { url, prompt }
 */
export default function ImageGrid({ images = [] }) {
  if (!images.length) {
    return <div className="text-gray-500">No images yet — generate one!</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, idx) => (
        <div key={idx} className="border rounded overflow-hidden">
          <img src={img.url} alt={img.prompt} className="w-full h-48 object-cover" />
          <div className="p-2 text-sm">
            <div className="truncate">{img.prompt}</div>
            <div className="mt-2 flex gap-2">
              <a className="text-xs text-blue-600" href={img.url} target="_blank" rel="noreferrer">Open</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
