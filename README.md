# SearchProxy

A browser-based search app designed to run without Linux. It works by deploying the backend to a hosted platform such as Vercel, Render, or GitHub Codespaces.

## Local run

```bash
npm install
npm start
```

Open: `http://localhost:3000`

## No-Linux deployment

Use a hosted service like Vercel:

1. Push this repo to GitHub
2. Import it into Vercel
3. Click Deploy
4. The app starts in the cloud and no Linux is required

## Why this is the best no-Linux option

A normal browser cannot fetch arbitrary search results directly without CORS restrictions.
The server-side proxy keeps the app working and avoids browser security blocks.

## Deploy target

- Vercel
- Render
- Railway
- GitHub Codespaces
