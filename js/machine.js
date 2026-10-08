(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("#machine-detail-content");
    if (!root) return;
    const ui = CommandoUI;
    try {
      await CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase machine detail could not be loaded:", error);
    }
    const id = new URLSearchParams(location.search).get("id");
    const item = CommandoData.getMachines().find((machine) => machine.id === id && machine.status === "Published");
    if (!item) {
      root.innerHTML = `<section class="page-intro"><span class="eyebrow accent">Machine library</span><h1>Machine not found.</h1><a class="btn btn-secondary" href="machines.html">Back to machines</a></section>`;
      return;
    }
    let safeTutorialUrl = "";
    if (item.tutorialUrl) {
      try {
        const parsedUrl = new URL(item.tutorialUrl, location.href);
        if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") safeTutorialUrl = parsedUrl.href;
      } catch (error) {
        console.warn("Machine tutorial URL is invalid:", error);
      }
    }
    document.title = `${item.name} | COMMando Fitness Gym Rajgarh`;
    root.innerHTML = `<section class="detail-hero">
      <div class="detail-art"><img src="${ui.escapeHtml(item.image)}" alt="${ui.escapeHtml(item.name)} equipment photo" fetchpriority="high" /></div>
      <div class="detail-copy"><span class="eyebrow accent">${ui.escapeHtml(item.category)} · equipment photo</span><h1>${ui.escapeHtml(item.name)}</h1><p><strong>Target muscles:</strong> ${ui.escapeHtml(item.muscles)}</p><p>${ui.escapeHtml(item.description)}</p><a class="btn btn-secondary" href="machines.html">All machines</a></div>
    </section>
    <section class="detail-sections">
      <article class="detail-panel"><h2>How to use</h2><ol>${item.instructions.split(";").map((step) => `<li>${ui.escapeHtml(step.trim())}</li>`).join("")}</ol></article>
      <article class="detail-panel"><h2>Beginner guidance</h2><p><strong>Sets:</strong> ${ui.escapeHtml(item.sets)}<br /><strong>Reps:</strong> ${ui.escapeHtml(item.reps)}</p></article>
      <article class="detail-panel"><h2>Common mistakes</h2><p>${ui.escapeHtml(item.commonMistakes || "No guidance added yet.")}</p></article>
      <article class="detail-panel"><h2>Safety tips</h2><p>${ui.escapeHtml(item.safetyTips || "No safety guidance added yet.")}</p></article>
      <article class="detail-panel"><h2>Coach tip</h2><p>${ui.escapeHtml(item.coachTip || "No coach tip added yet.")}</p></article>
      <article class="detail-panel"><h2>Tutorial video</h2>${safeTutorialUrl ? `<a class="text-link" href="${ui.escapeHtml(safeTutorialUrl)}" rel="noopener noreferrer">Open tutorial</a>` : "<p>No tutorial video has been provided yet.</p>"}</article>
    </section>`;
  });
})();
