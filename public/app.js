const gate = document.getElementById("download-gate");
const searchApp = document.getElementById("search-app");
const downloadLink = document.getElementById("download-link");
const openAppButton = document.getElementById("open-app");
const closeAppButton = document.getElementById("close-app");
const downloadStatus = document.getElementById("download-status");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const engineSelect = document.getElementById("search-engine");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");

// A browser cannot verify that a file was saved, so the gate unlocks after
// the user starts the download. The actual app still runs locally with npm.
downloadLink.addEventListener("click", () => {
  openAppButton.disabled = false;
  downloadStatus.textContent = "Download started. You can now open the app.";
  downloadStatus.classList.add("success");
});

openAppButton.addEventListener("click", () => {
  gate.classList.add("hidden");
  searchApp.classList.remove("hidden");
  searchApp.setAttribute("aria-hidden", "false");
  input.focus();
});

closeAppButton.addEventListener("click", () => {
  searchApp.classList.add("hidden");
  searchApp.setAttribute("aria-hidden", "true");
  gate.classList.remove("hidden");
});

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
    if (!response.ok || data.error) throw new Error(data.error || "Search request failed");

    statusEl.textContent = `Showing ${data.results.length} results for “${query}”`;
    resultsEl.innerHTML = data.results.length
      ? data.results.map((item) => `
          <article class="result-card">
            <a href="${item.url || item.link || "#"}" target="_blank" rel="noopener noreferrer">${item.title || "Untitled result"}</a>
            <p>${item.snippet || "No description available."}</p>
          </article>`).join("")
      : '<div class="empty">No results found.</div>';
  } catch (error) {
    statusEl.textContent = "Search failed.";
    resultsEl.innerHTML = `<div class="empty">${error.message}</div>`;
  }
});
