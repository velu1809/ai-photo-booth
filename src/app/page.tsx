'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(''); // public S3 image URL
  const [theme, setTheme] = useState('pixar'); // or 'cyberpunk', etc.
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, theme }),
    });

    const data = await res.json();
    setGeneratedImageUrl(data.generatedImageUrl);
    setLoading(false);
  };

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">AI Photo Booth</h1>

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Paste your S3 image URL"
        className="border p-2 w-full max-w-md mb-4"
      />

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="pixar">Pixar</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="sketch">Sketch</option>
        <option value="anime">Anime</option>
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate AI Image'}
      </button>

      {generatedImageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Image</h2>
          <img src={generatedImageUrl} alt="AI Result" className="mx-auto max-w-md rounded shadow" />
        </div>
      )}
    </main>
  );
}
