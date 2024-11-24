import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { content, length, tone } = await req.json();
  console.log({ length, tone });
  const openai = new OpenAI({
    apiKey:
      "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",
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that rewrites whatever the user types in the prompt. Your responses should be written in a ${tone} tone and should be ${length} in length.`,
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return NextResponse.json({
    text: completion.choices[0].message.content,
  });
}
