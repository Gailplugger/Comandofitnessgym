(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const root = document.querySelector("#notifications-list");
    const empty = document.querySelector("#notifications-empty");
    if (!root) return;
    const ui = CommandoUI;
    try {
      await CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase notifications could not be loaded:", error);
    }
    const items = CommandoData.getNotifications().filter((item) => item.status === "Published");
    root.innerHTML = items.map((item) => `<article class="notification-card"><div><span class="badge ${item.priority.toLowerCase()}">${ui.escapeHtml(item.type)} · ${ui.escapeHtml(item.priority)}</span><h3>${ui.escapeHtml(item.title)}</h3><p>${ui.escapeHtml(item.message)}</p></div><div class="notification-meta">${ui.escapeHtml(item.date || "Demo")}</div></article>`).join("");
    empty?.classList.toggle("hidden", items.length !== 0);
    root.classList.toggle("hidden", items.length === 0);
  });
})();
