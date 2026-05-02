# Pokédex GO

A Pokémon GO–inspired Pokédex built with React + Vite + Apollo GraphQL, featuring a Claude-powered chat assistant.

# 🌐 Live Site
**[https://my-pokedex-with-ai.vercel.app](https://my-pokedex-with-ai.vercel.app)**

---
## Stack

| Layer | Tool |
|-------|------|
| Build | Vite 5 |
| UI | React 18 |
| GraphQL | @apollo/client 3 |
| Styling | CSS Modules |
| AI | Claude API (claude-sonnet-4-20250514) |
| Data | graphql-pokeapi.graphcdn.app |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.example .env
# then edit .env and set VITE_ANTHROPIC_API_KEY=sk-ant-...

# 3. Run dev server
npm run dev
```

Open http://localhost:5173

## API Key Setup

The Claude chat feature requires an Anthropic API key.

**For development**, set it in `.env`:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**For production**, never expose the key in the frontend. Instead:
1. Create a serverless function (Vercel Edge, Cloudflare Worker, or Express endpoint)
2. Have your frontend call `/api/chat`
3. Your server adds the `x-api-key` header before forwarding to Anthropic

See `src/hooks/usePokeChat.js` — the fetch call is the only thing that needs updating.

## Features

- Pokémon GO teal color palette matching the official app
- 4-column responsive grid (scales to 8 cols on desktop)
- Live search by Pokémon name
- Detail modal with typewriter name animation + animated stat bars
- Professor Claude chatbox — Pokémon-scoped Claude assistant
- Multi-turn conversation with session history
- Quick-prompt pills for common questions

## Project Structure

```
src/
  components/
    Header.jsx          # Sticky top bar with search + AI button
    PokemonGrid.jsx     # Paginated grid of Pokémon cards
    PokemonCard.jsx     # Individual GO-style card (number below sprite)
    SearchResults.jsx   # Single-result search view
    PokemonModal.jsx    # Detail modal with typewriter + stats
    ChatPanel.jsx       # Professor Claude chat interface
  graphql/
    client.js           # Apollo client setup
    queries.js          # GET_POKEMONS + GET_POKEMON queries
  hooks/
    usePokeChat.js      # Claude API wrapper with conversation history
    useTypewriter.js    # Character-by-character text animation
  constants.js          # Type colors, stat labels, system prompt
  App.jsx               # Root component
  index.css             # Global CSS variables + reset
```
