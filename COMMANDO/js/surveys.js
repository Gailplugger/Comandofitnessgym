(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("#surveys-list");
    const empty = document.querySelector("#surveys-empty");
    if (!root) return;
    const ui = CommandoUI;
    try {
      await CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase surveys could not be loaded:", error);
    }
    const items = CommandoData.getSurveys().filter((survey) => survey.status === "Published");
    root.innerHTML = items.map((survey) => `<article class="survey-card"><span class="badge live">Open</span><h2>${ui.escapeHtml(survey.title)}</h2><p>${ui.escapeHtml(survey.description)}</p><div class="survey-meta">${survey.questions.length} questions · about ${survey.minutes} min</div><a class="btn btn-primary" href="survey.html?id=${encodeURIComponent(survey.id)}">Start survey</a></article>`).join("");
    empty?.classList.toggle("hidden", items.length !== 0);
    root.classList.toggle("hidden", items.length === 0);
  });
})();
