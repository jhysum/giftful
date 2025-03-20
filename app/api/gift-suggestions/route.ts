import { NextRequest, NextResponse } from "next/server";
import anthropic from "@/lib/claude/client";

export async function POST(req: NextRequest) {
  try {
    const { relationship, interests } = await req.json();

    if (!relationship) {
      return NextResponse.json(
        { error: "Relationship type is required" },
        { status: 400 }
      );
    }

    const systemPrompt =
      "You are a helpful gift suggestion assistant. Provide practical, thoughtful gift ideas.";

    const userPrompt = `Suggest 3 gift ideas for a ${relationship}${
      interests ? ` who enjoys ${interests}` : ""
    }.
    Price range: $20-$100.
    Format each suggestion as a JSON object with fields: name, description (10 words max), and price (as number).
    Return a JSON array of these 3 objects, structured as: {"suggestions": [{"name": "Gift name", "description": "Brief description", "price": 45}, ...]}`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    let suggestions;
    try {
      // Extract the JSON from Claude's response
      const content = response.content[0].text;
      const jsonMatch = content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]).suggestions || [];
      } else {
        // Fallback parsing in case Claude doesn't format exactly as expected
        const lines = content
          .split("\n")
          .filter((line) => line.includes('"name"') || line.includes("name:"));
        suggestions = [];

        for (let i = 0; i < Math.min(lines.length, 3); i++) {
          suggestions.push({
            name: `Gift idea ${i + 1}`,
            description: "A thoughtful gift option",
            price: 25 + i * 15,
          });
        }
      }
    } catch (e) {
      console.error("Error parsing Claude response:", e);
      console.error("Raw response:", response.content[0].text);
      suggestions = [];
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error generating gift suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate gift suggestions" },
      { status: 500 }
    );
  }
}
