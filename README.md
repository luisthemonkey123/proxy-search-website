# SearchProxy for Chromebook

A lightweight web search app optimized for Chromebook. Run directly in Linux (Beta) or GitHub Codespaces.

## Option 1: Linux (Beta) on Chromebook

Enable Linux on your Chromebook, then:

```bash
git clone https://github.com/luisthemonkey123/proxy-search-website.git
cd proxy-search-website
npm install
npm start
```

Open: `http://localhost:3000`

## Option 2: GitHub Codespaces (Cloud IDE)

1. Fork this repo on GitHub
2. Open with Codespaces
3. Run:
   ```bash
   npm install
   npm start
   ```

## Features

- Search via DuckDuckGo or Bing
- Private, ad-free results
- Works offline (after startup)
- Mobile-friendly for Chromebook tablets

## Troubleshooting

**Linux not available?** Use Codespaces instead (free).

**Port 3000 in use?** Change it:
```bash
PORT=8000 npm start
```
