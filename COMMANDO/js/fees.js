(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("#fees-list");
    if (!root) return;
    const ui = CommandoUI;
    try {
      await CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase membership plans could not be loaded:", error);
    }
    const plans = CommandoData.getFees().filter((plan) => plan.status === "Published");
    root.innerHTML = plans.map((plan) => `<article class="price-card"><span class="badge live">Membership plan</span><h2>${ui.escapeHtml(plan.plan)}</h2><p>${ui.escapeHtml(plan.duration)}</p><div class="price">${ui.escapeHtml(plan.price)}</div><ul>${(plan.features || []).map((feature) => `<li>${ui.escapeHtml(feature)}</li>`).join("")}</ul><a class="btn btn-secondary" href="contact.html">Ask about membership</a></article>`).join("") || `<div class="empty-state">No plans available yet.</div>`;
  });
})();
