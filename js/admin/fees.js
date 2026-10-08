(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const root = document.querySelector("#admin-fees-list");
    const modal = document.querySelector("#fee-modal");
    const form = document.querySelector("#fee-form");
    if (!root || !modal || !form) return;
    let editing = null;
    const esc = CommandoUI.escapeHtml;
    const render = () => {
      root.innerHTML = CommandoData.getFees().map((plan) => `<article class="price-card"><span class="badge live">Membership rate</span><h2>${esc(plan.plan)}</h2><p>${esc(plan.duration)}</p><div class="price">${esc(plan.price)}</div><ul>${(plan.features || []).map((feature) => `<li>${esc(feature)}</li>`).join("")}</ul><span class="badge ${plan.status === "Published" ? "live" : ""}">${esc(plan.status)}</span><div class="action-group"><button class="table-action" data-action="edit" data-id="${esc(plan.id)}">Edit</button><button class="table-action" data-action="toggle" data-id="${esc(plan.id)}">${plan.status === "Published" ? "Unpublish" : "Publish"}</button><button class="table-action danger" data-action="delete" data-id="${esc(plan.id)}">Delete</button></div></article>`).join("");
    };
    document.querySelector("#add-fee-btn").addEventListener("click", () => { editing = null; form.reset(); form.elements.status.value = "Published"; modal.querySelector("h2").textContent = "Add plan"; modal.showModal(); });
    root.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const plan = CommandoData.getFees().find((item) => item.id === button.dataset.id);
      if (!plan) return;
      try {
        if (button.dataset.action === "delete" && confirm(`Delete ${plan.plan}?`)) {
          await CommandoData.deleteFee(plan.id);
          render();
        }
        if (button.dataset.action === "toggle") {
          await CommandoData.saveFee({ ...plan, status: plan.status === "Published" ? "Draft" : "Published" });
          render();
        }
      } catch (error) {
        CommandoUI.toast(`Could not save membership changes: ${error.message}`);
      }
      if (button.dataset.action === "edit") { editing = plan.id; Object.entries({ ...plan, features: (plan.features || []).join("\n") }).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; }); modal.querySelector("h2").textContent = "Edit plan"; modal.showModal(); }
    });
    document.addEventListener("click", (event) => { if (event.target.closest('[data-close-modal="fee-modal"]')) modal.close(); });
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      try {
        await CommandoData.saveFee({ ...values, id: editing || undefined, features: String(values.features).split(/\r?\n/).map((item) => item.trim()).filter(Boolean) });
        modal.close(); render();
      } catch (error) {
        CommandoUI.toast(`Unable to save membership plan: ${error.message}`);
      }
    });
    render();
  });
})();
