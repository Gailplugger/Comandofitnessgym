(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    window.CommandoUI?.renderHeader();
    window.CommandoUI?.renderFooter();

    const toggle = document.querySelector("#mobile-menu-toggle");
    const navigation = document.querySelector("#primary-navigation");
    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      navigation?.classList.toggle("open", open);
    });

    try {
      await window.CommandoData.loadCloudContent();
    } catch (error) {
      console.error("Firebase notifications could not be loaded:", error);
      window.CommandoUI?.toast("Live Firebase content is unavailable. Showing the saved starter content.");
    }
    window.CommandoUI?.renderBanner();
    const button = document.querySelector("#notification-toggle");
    const popover = document.querySelector("#notification-popover");
    if (!button || !popover || !window.CommandoData) return;
    const all = CommandoData.getNotifications().filter((item) => item.status === "Published");
    let read = CommandoData.getReadNotifications();
    const render = () => {
      const unread = all.filter((item) => !read.includes(item.id));
      const count = document.querySelector("#unread-count");
      if (count) { count.textContent = unread.length > 9 ? "9+" : String(unread.length); count.hidden = unread.length === 0; }
      popover.innerHTML = `<div class="popover-head"><h2>Latest notifications</h2><button class="icon-button" type="button" id="close-notifications" aria-label="Close notifications">×</button></div>
        <div class="popover-list">${all.slice(0, 3).map((item) => `<article class="popover-item ${read.includes(item.id) ? "is-read" : "is-unread"}"><div class="popover-title-row"><span class="badge ${item.priority.toLowerCase()}">${CommandoUI.escapeHtml(item.priority)}</span><span class="read-dot" aria-label="${read.includes(item.id) ? "Read" : "Unread"}"></span></div><strong>${CommandoUI.escapeHtml(item.title)}</strong><p>${CommandoUI.escapeHtml(item.message)}</p><small>${CommandoUI.escapeHtml(item.date || "Demo")}</small><div class="popover-actions"><a href="notifications.html">View</a>${read.includes(item.id) ? "<span>Read</span>" : `<button type="button" data-mark-read="${CommandoUI.escapeHtml(item.id)}">Mark as read</button>`}</div></article>`).join("") || "<p>No notifications yet.</p>"}</div>
        <div class="popover-actions popover-foot"><button type="button" id="mark-all-read">Mark all as read</button><a href="notifications.html">View all notifications</a></div>`;
      popover.querySelector("#close-notifications").addEventListener("click", close);
      popover.querySelectorAll("[data-mark-read]").forEach((markButton) => markButton.addEventListener("click", () => {
        if (!read.includes(markButton.dataset.markRead)) read = [...read, markButton.dataset.markRead];
        CommandoData.setReadNotifications(read);
        render();
      }));
      popover.querySelector("#mark-all-read").addEventListener("click", () => { read = all.map((item) => item.id); CommandoData.setReadNotifications(read); render(); });
    };
    const close = () => { popover.hidden = true; button.setAttribute("aria-expanded", "false"); };
    render();
    button.addEventListener("click", () => {
      const open = popover.hidden;
      popover.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
      if (open) {
        render();
        popover.querySelector("#close-notifications")?.focus();
      }
    });
    document.addEventListener("click", (event) => { if (!popover.contains(event.target) && !button.contains(event.target)) close(); });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !popover.hidden) {
        close();
        button.focus();
      }
    });
  });
})();
