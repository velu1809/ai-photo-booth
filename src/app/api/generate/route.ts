import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { theme } = await req.json();

  const prompt = `a ${theme} style portrait of a person`;

  const response = await fetch(
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Hugging Face API Error:", error);
    return NextResponse.json({ error: error.error || 'Image generation failed' }, { status: 500 });
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

  return NextResponse.json({ generatedImageUrl: dataUrl });
}