# Chibi Sumo Stable - AGENTS.md
Project: Universal fantasy sumo app (Expo React Native + Web + Supabase + Phaser)

## Native Subagents (use @mentions)

@planner
- High-level architecture, task breakdown, acceptance criteria
- Always starts every new feature

@expo-rn
- React Native, Expo, Expo Router, NativeWind, universal web code
- Screens, navigation, mobile-specific logic

@supabase
- Database schemas, auth, realtime subscriptions, edge functions
- Fantasy scoring, leagues, stables

@api-integrator
- sumo-api.com integration, caching, live torikumi/results
- Banzuke, rikishi stats, basho schedule

@phaser
- Chibi Dohyo Rumble mini-game (arena, controls, multiplayer sync)

@chibi-designer
- Kawaii chibi components, animations, NativeWind styling
- Stat inheritance, reactions, accessories

@reviewer
- Code quality, TypeScript strictness, performance, best practices
- Always runs after implementation

@tester
- Test instructions for web + mobile simulators
- Edge cases and manual verification steps

## Project Rules
- One codebase for web + iOS + Android
- Use Expo Router (app/ folder)
- Tailwind via NativeWind
- No real-money betting — virtual sumo coins only
- Kawaii aesthetic with dense Japan-style bento grids
- All features must work perfectly on web first
- Keep PR-style commits small