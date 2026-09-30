const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const engineSelect = document.getElementById("search-engine");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  const engine = engineSelect.value;

  if (!query) {
    statusEl.textContent = "Please enter a search term.";
    resultsEl.innerHTML = '<div class="empty">Type something to search.</div>';
    return;
  }

  statusEl.textContent = `Searching ${engine}...`;
  resultsEl.innerHTML = "";

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&engine=${encodeURIComponent(engine)}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Search request failed");
    }

    if (!data.results || data.results.length === 0) {
      statusEl.textContent = `No results for “${query}”`;
      resultsEl.innerHTML = '<div class="empty">No results found.</div>';
      return;
    }

    statusEl.textContent = `Showing ${data.results.length} results for “${query}”`;

    resultsEl.innerHTML = data.results
      .map(
        (item) => `
          <article class="result-card">
            <a href="${item.url || item.link || "#"}" target="_blank" rel="noopener noreferrer">
              ${item.title || "Untitled result"}
            </a>
            <p>${item.snippet || "No description available."}</p>
          </article>
        `
      )
      .join("");
  } catch (error) {
    statusEl.textContent = "Search failed.";
    resultsEl.innerHTML = `<div class="empty">${error.message}</div>`;
  }
});
