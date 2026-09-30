# Search Proxy

A lightweight web search app that uses a backend proxy to fetch and display search results without browser CORS issues.

## Features

- Search via DuckDuckGo or Bing
- Clean modern UI
- Backend proxy via Express.js
- Mobile responsive layout

## Run locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Deployment ideas

- Vercel or Render
- GitHub Pages for the frontend + separate backend deploy
- Docker container

## Notes

This is a demo/proxy project for learning and local testing. Search engines may block automated scraping or change their markup over time.
