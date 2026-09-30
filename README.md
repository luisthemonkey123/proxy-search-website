# Proxy Search Website

A simple web application that allows you to search the web through a proxy.

## Features

- Clean, dark-themed UI
- Server-side proxy to avoid CORS issues
- Search via DuckDuckGo
- Fast and responsive

## Installation

1. Clone this repository:

```bash
git clone https://github.com/luisthemonkey123/proxy-search-website.git
cd proxy-search-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open your browser and go to:

```
http://localhost:3000
```

## How it works

1. User types a search query in the browser
2. Frontend sends request to `/api/search?q=...`
3. Backend server fetches search results from DuckDuckGo
4. Results are parsed and returned as JSON
5. Frontend displays results in a nice card layout

## Dependencies

- **Express.js** - Web server framework
- **Cheerio** - HTML parsing library

## License

MIT
