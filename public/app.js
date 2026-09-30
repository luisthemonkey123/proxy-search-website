const gate = document.getElementById("setup-gate");
const searchApp = document.getElementById("search-app");
const linuxReady = document.getElementById("linux-ready");
const codespacesReady = document.getElementById("codespaces-ready");
const closeAppButton = document.getElementById("close-app");
const setupStatus = document.getElementById("setup-status");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const engineSelect = document.getElementById("search-engine");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");

linuxReady.addEventListener("click", () => {
  setupStatus.textContent = "Connected to Linux server ✓";
  setupStatus.classList.add("success");
  unlockApp();
});

codespacesReady.addEventListener("click", () => {
  setupStatus.textContent = "Connected to Codespaces ✓";
  setupStatus.classList.add("success");
  unlockApp();
});

function unlockApp() {
  gate.classList.add("hidden");
  searchApp.classList.remove("hidden");
  searchApp.setAttribute("aria-hidden", "false");
  setTimeout(() => input.focus(), 100);
}

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
