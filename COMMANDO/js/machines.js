(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const data = CommandoData;
    const ui = CommandoUI;
    const search = document.querySelector("#machine-search");
    const filters = document.querySelector("#category-filters");
    const grid = document.querySelector("#machines-grid");
    const empty = document.querySelector("#machines-empty");
    if (!grid || !filters) return;
    try {
      await data.loadCloudContent();
    } catch (error) {
      console.error("Firebase machine catalogue could not be loaded:", error);
    }
    const standardCategories = ["Chest", "Back", "Shoulders", "Legs", "Arms", "Cardio", "Other"];
    const extraCategories = [...new Set(data.getMachines().map((item) => item.category))].filter((category) => !standardCategories.includes(category));
    const categories = ["All", ...standardCategories, ...extraCategories];
    let active = "All";
    filters.innerHTML = categories.map((category) => `<button class="filter-chip" type="button" aria-pressed="${category === active}" data-category="${ui.escapeHtml(category)}">${ui.escapeHtml(category)}</button>`).join("");
    const render = () => {
      const query = search.value.trim().toLowerCase();
      const results = data.getMachines().filter((item) => item.status === "Published" && (active === "All" || item.category === active) && `${item.name} ${item.category} ${item.muscles}`.toLowerCase().includes(query));
      grid.innerHTML = results.map((item) => `<article class="machine-card"><div class="machine-art"><img src="${ui.escapeHtml(item.image)}" alt="${ui.escapeHtml(item.name)} equipment photo" loading="lazy" /></div><div class="machine-copy"><span class="badge">${ui.escapeHtml(item.category)}</span><h3>${ui.escapeHtml(item.name)}</h3><p>${ui.escapeHtml(item.muscles)}</p><a class="text-link" href="machine.html?id=${encodeURIComponent(item.id)}">View machine →</a></div></article>`).join("");
      empty.classList.toggle("hidden", results.length !== 0);
      grid.classList.toggle("hidden", results.length === 0);
    };
    filters.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-category]");
      if (!chip) return;
      active = chip.dataset.category;
      filters.querySelectorAll(".filter-chip").forEach((button) => button.setAttribute("aria-pressed", String(button === chip)));
      render();
    });
    search.addEventListener("input", render);
    render();
  });
})();
