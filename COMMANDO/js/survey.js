(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("#survey-renderer");
    if (!root) return;
    const ui = CommandoUI;
    try {
      await CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase survey could not be loaded:", error);
    }
    const survey = CommandoData.getSurveys().find((item) => item.id === new URLSearchParams(location.search).get("id") && item.status === "Published");
    if (!survey) { root.innerHTML = `<section class="page-intro"><h1>Survey unavailable</h1><a class="btn btn-secondary" href="surveys.html">Back to surveys</a></section>`; return; }
    document.title = `${survey.title} | COMMando Fitness Gym Rajgarh`;
    const field = (question, index) => {
      const name = `q-${ui.escapeHtml(question.id)}`;
      const required = question.required ? "required" : "";
      let control = "";
      if (["short", "long", "number", "date"].includes(question.type)) {
        const type = question.type === "short" ? "text" : question.type === "long" ? "textarea" : question.type;
        control = type === "textarea" ? `<textarea name="${name}" rows="4" ${required}></textarea>` : `<input name="${name}" type="${type}" ${required} />`;
      } else if (question.type === "rating") {
        control = `<div class="options">${[1, 2, 3, 4, 5].map((value) => `<label><input type="radio" name="${name}" value="${value}" ${required} /> ${value}</label>`).join("")}</div>`;
      } else if (question.type === "yesno") {
        control = `<div class="options">${["Yes", "No"].map((value) => `<label><input type="radio" name="${name}" value="${value}" ${required} /> ${value}</label>`).join("")}</div>`;
      } else if (question.type === "multiple" || question.type === "checkbox") {
        control = `<div class="options">${(question.options || []).map((value, optionIndex) => `<label><input type="${question.type === "multiple" ? "radio" : "checkbox"}" name="${name}" value="${ui.escapeHtml(value)}" ${required && optionIndex === 0 ? "required" : ""} /> ${ui.escapeHtml(value)}</label>`).join("")}</div>`;
      } else if (question.type === "dropdown") {
        control = `<select name="${name}" ${required}><option value="">Choose an option</option>${(question.options || []).map((value) => `<option value="${ui.escapeHtml(value)}">${ui.escapeHtml(value)}</option>`).join("")}</select>`;
      }
      return `<fieldset class="question" data-question-index="${index}"><legend>${ui.escapeHtml(question.text)} ${question.required ? '<span class="mock-label">Required</span>' : ""}</legend>${control}<span class="question-error" aria-live="polite"></span></fieldset>`;
    };
    root.innerHTML = `<section class="page-intro"><span class="eyebrow accent">Demo survey · local only</span><h1>${ui.escapeHtml(survey.title)}</h1><p>${ui.escapeHtml(survey.description)}</p><div class="survey-progress" aria-label="Survey completion"><span id="survey-progress-fill"></span></div></section>
      <form class="survey-form" id="survey-form" novalidate>${survey.questions.map(field).join("")}<button class="btn btn-primary" type="submit">Submit response</button><p class="status-text" id="survey-status" aria-live="polite">Your response will be stored locally in this browser for the demo.</p></form>`;
    const form = root.querySelector("#survey-form");
    const progress = root.querySelector("#survey-progress-fill");
    const updateProgress = () => {
      const answered = survey.questions.filter((question) => {
        const controls = [...form.elements].filter((element) => element.name === `q-${question.id}`);
        return controls.some((element) => element.type === "checkbox" || element.type === "radio" ? element.checked : Boolean(element.value));
      }).length;
      progress.style.width = `${Math.round((answered / survey.questions.length) * 100)}%`;
    };
    form.addEventListener("input", updateProgress);
    form.addEventListener("change", updateProgress);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      survey.questions.forEach((question, index) => {
        const fieldset = form.querySelector(`[data-question-index="${index}"]`);
        const controls = [...fieldset.querySelectorAll("input, textarea, select")];
        const answered = controls.some((control) => control.type === "checkbox" || control.type === "radio" ? control.checked : Boolean(control.value.trim?.() ?? control.value));
        const invalid = controls.some((control) => !control.checkValidity());
        const error = fieldset.querySelector(".question-error");
        error.textContent = question.required && !answered ? "Please answer this required question." : invalid ? "Please enter a valid answer." : "";
        if ((question.required && !answered) || invalid) valid = false;
      });
      if (!valid) { form.querySelector(".question-error:not(:empty)")?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      const answers = {};
      survey.questions.forEach((question) => {
        const controls = [...form.elements].filter((element) => element.name === `q-${question.id}`);
        answers[question.id] = question.type === "checkbox" ? controls.filter((control) => control.checked).map((control) => control.value) : (controls.find((control) => control.checked)?.value ?? controls[0]?.value ?? "");
      });
      const saved = CommandoData.saveSurveyResponse({ surveyId: survey.id, surveyTitle: survey.title, date: new Date().toISOString(), answers });
      if (!saved) { root.querySelector("#survey-status").textContent = "Unable to save this response locally. Please check browser storage settings."; return; }
      root.innerHTML = `<div class="success-panel"><span class="eyebrow accent">Response recorded locally</span><h2>Thank you for sharing.</h2><p>This demo response was saved in this browser only. It was not sent to a server.</p><a class="btn btn-secondary" href="surveys.html">Back to surveys</a></div>`;
    });
  });
})();
