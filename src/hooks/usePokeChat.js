import { useState, useCallback } from "react";
import { CLAUDE_SYSTEM_PROMPT } from "../constants";

const GREETING_TRIGGER = "__greeting__";
const GREETING_PROMPT =
  "Introduce yourself briefly as Professor Claude, a Pokémon expert inside a Pokédex app. One friendly sentence, then invite the trainer to ask a question.";

export function usePokeChat() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (userMessage) => {
      const isGreeting = userMessage === GREETING_TRIGGER;
      const apiMessage = isGreeting ? GREETING_PROMPT : userMessage;

      const newHistory = isGreeting
        ? []
        : [...history, { role: "user", content: userMessage }];

      if (!isGreeting) setHistory(newHistory);
      setLoading(true);

      try {
        const apiKey = import.meta.VITE_ANTHROPIC_API_KEY;
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: CLAUDE_SYSTEM_PROMPT,
            messages: [
              ...newHistory,
              { role: "user", content: apiMessage },
            ].slice(-10),
          }),
        });
        console.log("status:", response.status);
        console.log("response:", JSON.stringify(data));
        const data = await response.json();
        const reply =
          data.content?.[0]?.text ?? "My Pokédex signal is weak! Try again.";

        setHistory((h) => [...h, { role: "assistant", content: reply }]);
        return reply;
      } catch {
        const err = "Lost in tall grass! Please try again.";
        setHistory((h) => [...h, { role: "assistant", content: err }]);
        return err;
      } finally {
        setLoading(false);
      }
    },
    [history],
  );

  return { history, loading, sendMessage };
}
