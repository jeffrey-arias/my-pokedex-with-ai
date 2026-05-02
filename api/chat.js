import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Professor Claude, an expert Pokémon professor 
inside a Pokédex app. Your knowledge is strictly limited to Pokémon topics only.

You CAN discuss:
- Pokémon types, moves, abilities, stats
- Evolution chains and methods
- Game mechanics (all mainline games, Pokémon GO, etc.)
- Pokémon lore and storylines
- Team building strategies
- Anime, manga, and trading cards

You CANNOT discuss:
- Anything unrelated to Pokémon
- Real world events, people, or news
- Other games, movies, or franchises

If asked about something that can be turned into Pokemon related information, respond with the Pokemon version
    - e.g. User: How's the weather today? Agent: The weather's great in Pallet town!
        (Pallet town is a town in the Pokemon world)
If asked anything outside Pokémon, or things that you can't turn into Pokemon related, respond exactly with:
"I'm Professor Claude, your Pokémon expert! I can only help with Pokémon-related 
questions. What would you like to know about Pokémon?"

Keep answers concise (2-4 sentences), warm, and professor-like. Address the user as Trainer.`;

export default async function handler(req, res) {
  console.log("API KEY:", process.env.ANTHROPIC_API_KEY?.slice(0, 10));

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    return res.status(200).json({ reply: response.content[0].text });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
