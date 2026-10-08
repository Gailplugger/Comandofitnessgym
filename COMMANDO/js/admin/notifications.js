(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const root = document.querySelector("#admin-notifications-list");
    const modal = document.querySelector("#notification-modal");
    const form = document.querySelector("#notification-form");
    if (!root || !modal || !form) return;
    let editing = null;
    const esc = CommandoUI.escapeHtml;
    const render = () => {
      root.innerHTML = CommandoData.getNotifications().map((item) => `<article class="admin-list-card"><span class="badge ${item.priority.toLowerCase()}">${esc(item.type)} · ${esc(item.priority)}</span><h3>${esc(item.title)}</h3><p>${esc(item.message)}</p><p><span class="badge ${item.status === "Published" ? "live" : ""}">${esc(item.status)}</span> ${item.banner ? '<span class="badge">Banner</span>' : ""} <small>${esc(item.date || "No date")}</small></p><div class="action-group"><button class="table-action" data-action="edit" data-id="${esc(item.id)}">Edit</button><button class="table-action" data-action="toggle" data-id="${esc(item.id)}">${item.status === "Published" ? "Archive" : "Publish"}</button><button class="table-action danger" data-action="delete" data-id="${esc(item.id)}">Delete</button></div></article>`).join("") || `<div class="empty-state">No notifications yet.</div>`;
    };
    document.querySelector("#add-notification-btn").addEventListener("click", () => { editing = null; form.reset(); form.elements.status.value = "Published"; modal.querySelector("h2").textContent = "Create notification"; modal.showModal(); });
    root.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const item = CommandoData.getNotifications().find((row) => row.id === button.dataset.id);
      if (!item) return;
      try {
        if (button.dataset.action === "delete" && confirm(`Delete ${item.title}?`)) {
          await CommandoData.deleteNotification(item.id);
          render();
        }
        if (button.dataset.action === "toggle") {
          await CommandoData.saveNotification({ ...item, status: item.status === "Published" ? "Archived" : "Published" });
          render();
        }
      } catch (error) {
        CommandoUI.toast(`Could not save notification changes: ${error.message}`);
      }
      if (button.dataset.action === "edit") { editing = item.id; Object.entries(item).forEach(([key, value]) => { if (form.elements[key]) { if (form.elements[key].type === "checkbox") form.elements[key].checked = Boolean(value); else form.elements[key].value = value; } }); modal.querySelector("h2").textContent = "Edit notification"; modal.showModal(); }
    });
    document.addEventListener("click", (event) => { if (event.target.closest('[data-close-modal="notification-modal"]')) modal.close(); });
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const formData = new FormData(form);
      const values = Object.fromEntries(formData);
      try {
        await CommandoData.saveNotification({ ...values, id: editing || undefined, banner: formData.has("banner"), date: values.publishTime || new Date().toISOString().slice(0, 10) });
        modal.close(); render();
      } catch (error) {
        CommandoUI.toast(`Unable to save notification: ${error.message}`);
      }
    });
    render();
  });
})();
