(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const table = document.querySelector("#response-summary");
    const detail = document.querySelector("#response-detail");
    if (!table || !detail) return;
    const surveys = CommandoData.getSurveys();
    const responses = CommandoData.getSurveyResponses();
    const esc = CommandoUI.escapeHtml;
    table.innerHTML = surveys.map((survey) => {
      const count = responses.filter((response) => response.surveyId === survey.id).length;
      return `<tr><td data-label="Survey">${esc(survey.title)}</td><td data-label="Date">${count ? esc(responses.filter((response) => response.surveyId === survey.id).at(-1).date.slice(0, 10)) : "—"}</td><td data-label="Response count">${count}</td><td data-label="Action"><button class="table-action" data-view-responses="${esc(survey.id)}">View responses</button></td></tr>`;
    }).join("");
    table.addEventListener("click", (event) => {
      const button = event.target.closest("[data-view-responses]");
      if (!button) return;
      const survey = surveys.find((item) => item.id === button.dataset.viewResponses);
      const matches = responses.filter((response) => response.surveyId === survey.id);
      detail.classList.remove("hidden");
      detail.innerHTML = `<h2>${esc(survey.title)} · local demo responses</h2>${matches.length ? matches.map((response) => `<article class="response-answer"><strong>${esc(response.date.slice(0, 10))}</strong>${Object.entries(response.answers).map(([questionId, answer]) => { const question = survey.questions.find((item) => item.id === questionId); return `<div class="response-answer"><strong>${esc(question?.text || questionId)}</strong>${esc(Array.isArray(answer) ? answer.join(", ") : answer)}</div>`; }).join("")}</article>`).join("") : "<p>No local demo responses recorded yet.</p>"}`;
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
