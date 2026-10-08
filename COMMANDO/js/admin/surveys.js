(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const root = document.querySelector("#admin-surveys-list");
    const modal = document.querySelector("#survey-modal");
    const form = document.querySelector("#survey-form");
    const builder = document.querySelector("#question-builder");
    if (!root || !modal || !form || !builder) return;
    let editing = null;
    let questions = [];
    const esc = CommandoUI.escapeHtml;
    const renderList = () => {
      root.innerHTML = CommandoData.getSurveys().map((survey) => `<article class="admin-list-card"><span class="badge ${survey.status === "Published" ? "live" : ""}">${esc(survey.status)}</span><h3>${esc(survey.title)}</h3><p>${esc(survey.description)}</p><p>${survey.questions.length} questions · ${survey.minutes || 3} min</p><div class="action-group"><button class="table-action" data-action="edit" data-id="${esc(survey.id)}">Edit</button><a class="table-action" href="../survey.html?id=${encodeURIComponent(survey.id)}">Preview</a><button class="table-action" data-action="toggle" data-id="${esc(survey.id)}">${survey.status === "Published" ? "Unpublish" : "Publish"}</button><button class="table-action danger" data-action="delete" data-id="${esc(survey.id)}">Delete</button></div></article>`).join("");
    };
    const renderBuilder = () => {
      builder.innerHTML = questions.map((question, index) => `<div class="builder-question" data-index="${index}"><label><span>Question</span><input data-field="text" value="${esc(question.text)}" required /></label><label><span>Type</span><select data-field="type">${["short", "long", "multiple", "checkbox", "dropdown", "yesno", "rating", "number", "date"].map((type) => `<option value="${type}" ${question.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><div class="action-group"><button class="table-action" type="button" data-move="-1" aria-label="Move question up">↑</button><button class="table-action" type="button" data-move="1" aria-label="Move question down">↓</button><button class="table-action danger" type="button" data-remove="${index}">Remove</button></div><label class="option-input"><span>Options (comma separated, if needed)</span><input data-field="options" value="${esc((question.options || []).join(", "))}" /></label><label class="required-toggle"><input type="checkbox" data-field="required" ${question.required ? "checked" : ""} /> Required</label></div>`).join("");
    };
    const blankQuestion = () => ({ id: `question-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text: "", type: "short", required: false, options: [] });
    const openNew = () => { editing = null; questions = [blankQuestion()]; form.reset(); renderBuilder(); modal.querySelector("h2").textContent = "Survey builder"; modal.showModal(); };
    document.querySelector("#new-survey-btn").addEventListener("click", openNew);
    document.querySelector("#add-question-btn").addEventListener("click", () => { questions.push(blankQuestion()); renderBuilder(); });
    builder.addEventListener("input", (event) => {
      const row = event.target.closest(".builder-question");
      if (!row) return;
      const question = questions[Number(row.dataset.index)];
      const field = event.target.dataset.field;
      if (field === "required") question.required = event.target.checked;
      else if (field === "options") question.options = event.target.value.split(",").map((item) => item.trim()).filter(Boolean);
      else if (field) question[field] = event.target.value;
    });
    builder.addEventListener("change", (event) => {
      const row = event.target.closest(".builder-question");
      if (!row || !event.target.dataset.field) return;
      const field = event.target.dataset.field;
      if (field === "required") questions[Number(row.dataset.index)].required = event.target.checked;
      else questions[Number(row.dataset.index)][field] = event.target.value;
    });
    builder.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove]");
      const move = event.target.closest("[data-move]");
      if (remove) questions.splice(Number(remove.dataset.remove), 1);
      if (move) {
        const row = move.closest(".builder-question");
        const from = Number(row.dataset.index);
        const to = from + Number(move.dataset.move);
        if (to >= 0 && to < questions.length) [questions[from], questions[to]] = [questions[to], questions[from]];
      }
      if (remove || move) renderBuilder();
    });
    root.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const survey = CommandoData.getSurveys().find((item) => item.id === button.dataset.id);
      if (!survey) return;
      try {
        if (button.dataset.action === "delete" && confirm(`Delete ${survey.title}?`)) {
          await CommandoData.deleteSurvey(survey.id);
          renderList();
        }
        if (button.dataset.action === "toggle") {
          await CommandoData.saveSurvey({ ...survey, status: survey.status === "Published" ? "Draft" : "Published" });
          renderList();
        }
      } catch (error) {
        CommandoUI.toast(`Could not save survey changes: ${error.message}`);
      }
      if (button.dataset.action === "edit") { editing = survey.id; questions = survey.questions.map((question) => ({ ...question })); form.elements.title.value = survey.title; form.elements.description.value = survey.description; form.elements.publish.checked = survey.status === "Published"; renderBuilder(); modal.querySelector("h2").textContent = "Edit survey"; modal.showModal(); }
    });
    document.addEventListener("click", (event) => { if (event.target.closest('[data-close-modal="survey-modal"]')) modal.close(); });
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const title = form.elements.title.value.trim();
      const description = form.elements.description.value.trim();
      const cleanQuestions = questions.map((question) => ({ ...question, text: question.text.trim() }));
      if (!cleanQuestions.length || cleanQuestions.some((question) => !question.text)) { CommandoUI.toast("Add at least one question and complete its text."); return; }
      try {
        await CommandoData.saveSurvey({ id: editing || undefined, title, description, questions: cleanQuestions, status: form.elements.publish.checked ? "Published" : "Draft", minutes: Math.max(1, Math.ceil(cleanQuestions.length * 0.7)) });
        modal.close(); renderList();
      } catch (error) {
        CommandoUI.toast(`Unable to save survey: ${error.message}`);
      }
    });
    renderList();
  });
})();
