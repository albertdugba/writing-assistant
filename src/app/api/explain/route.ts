import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { original, rewritten } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that explains how a rewritten text improves the original version. Provide clear and insightful feedback.`,
      },
      {
        role: "user",
        content: `Original: "${original}"\nRewritten: "${rewritten}"`,
      },
    ],
  });

  return NextResponse.json({
    text: completion.choices[0].message.content,
  });
}
