const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    resultsEl.innerHTML = '<div class="empty">Type something to search.</div>';
    return;
  }

  statusEl.textContent = "Searching...";
  resultsEl.innerHTML = "";

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Search request failed");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.results || data.results.length === 0) {
      resultsEl.innerHTML = '<div class="empty">No results found.</div>';
      statusEl.textContent = `No results for "${query}"`;
      return;
    }

    statusEl.textContent = `Showing results for "${query}"`;

    resultsEl.innerHTML = data.results
      .map(
        (item) => `
          <article class="result-card">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">
              ${item.title || "Untitled result"}
            </a>
            <div class="result-snippet">${item.snippet || "No description available."}</div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    statusEl.textContent = "Something went wrong.";
    resultsEl.innerHTML = `<div class="empty">${error.message}</div>`;
  }
});
