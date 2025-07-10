import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY!;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // 또는 gpt-4o
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
