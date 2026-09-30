export default async function handler(req, res) {
  const { q, engine = "duckduckgo" } = req.query;
  const query = String(q || "").trim();

  if (!query) {
    return res.status(200).json({ query: "", results: [] });
  }

  try {
    const targetUrl =
      engine === "bing"
        ? `https://www.bing.com/search?q=${encodeURIComponent(query)}`
        : `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SearchProxy/1.0)"
      }
    });

    const html = await response.text();
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);
    const results = [];

    if (engine === "bing") {
      $(".b_algo").each((_, element) => {
        const title = $(element).find("h2 a").first().text().trim();
        const url = $(element).find("h2 a").first().attr("href") || "#";
        const snippet = $(element).find(".b_caption p").first().text().trim();
        if (title || snippet) results.push({ title, url, snippet });
      });
    } else {
      $(".result").each((_, element) => {
        const title = $(element).find(".result-link").first().text().trim();
        const url = $(element).find(".result-link").first().attr("href") || "#";
        const snippet = $(element).find(".result-snippet").first().text().trim();
        if (title || snippet) results.push({ title, url, snippet });
      });
    }

    return res.status(200).json({ query, engine, results: results.slice(0, 10) });
  } catch (error) {
    return res.status(500).json({
      error: "Search failed. Please try again.",
      details: error.message
    });
  }
}
