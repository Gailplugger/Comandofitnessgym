(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const table = document.querySelector("#admin-machines-table");
    const modal = document.querySelector("#machine-modal");
    const form = document.querySelector("#machine-form");
    if (!table || !modal || !form) return;
    let editing = null;
    const esc = CommandoUI.escapeHtml;
    const render = () => {
      table.innerHTML = CommandoData.getMachines().map((item) => `<tr><td data-label="Machine">${esc(item.name)}</td><td data-label="Category">${esc(item.category)}</td><td data-label="Status"><span class="badge ${item.status === "Published" ? "live" : ""}">${esc(item.status)}</span></td><td data-label="Actions"><div class="action-group"><button class="table-action" data-action="edit" data-id="${esc(item.id)}">Edit</button><button class="table-action" data-action="toggle" data-id="${esc(item.id)}">${item.status === "Published" ? "Unpublish" : "Publish"}</button><button class="table-action danger" data-action="delete" data-id="${esc(item.id)}">Delete</button></div></td></tr>`).join("");
    };
    document.querySelector("#add-machine-btn").addEventListener("click", () => { editing = null; form.reset(); form.elements.status.value = "Published"; modal.querySelector("h2").textContent = "Add machine"; modal.showModal(); });
    document.addEventListener("click", (event) => {
      const close = event.target.closest("[data-close-modal]");
      if (close) modal.close();
    });
    table.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const item = CommandoData.getMachines().find((row) => row.id === button.dataset.id);
      if (!item) return;
      try {
        if (button.dataset.action === "delete" && confirm(`Delete ${item.name}?`)) {
          await CommandoData.deleteMachine(item.id);
          render();
        }
        if (button.dataset.action === "toggle") {
          await CommandoData.saveMachine({ ...item, status: item.status === "Published" ? "Draft" : "Published" });
          render();
        }
      } catch (error) {
        CommandoUI.toast(`Could not save machine changes: ${error.message}`);
      }
      if (button.dataset.action === "edit") {
        editing = item.id;
        Object.entries(item).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
        modal.querySelector("h2").textContent = "Edit machine";
        modal.showModal();
      }
    });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      const item = { ...values, id: editing || undefined };
      try {
        await CommandoData.saveMachine(item);
        modal.close(); form.reset(); render();
      } catch (error) {
        CommandoUI.toast(`Unable to save machine: ${error.message}`);
      }
    });
    render();
  });
})();
