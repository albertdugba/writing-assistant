import { NextResponse } from "next/server";
import { openai } from "~/lib/open-ai";

export async function POST(req: Request) {
  const { content, length, tone } = await req.json();

  try {
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: `Failed to fetch response from OpenAI: ${error}`,
      },
      { status: 500 }
    );
  }
}
