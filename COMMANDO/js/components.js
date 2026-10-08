(function () {
  "use strict";
  const links = [
    ["Home", "index.html", "home"], ["Machines", "machines.html", "machines"], ["Goals", "goals.html", "goals"],
    ["Fees", "fees.html", "fees"], ["Notifications", "notifications.html", "notifications"],
    ["Surveys", "surveys.html", "surveys"], ["Contact", "contact.html", "contact"]
  ];
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  window.CommandoUI = {
    escapeHtml,
    renderHeader() {
      const target = document.querySelector("#site-header");
      if (!target) return;
      const current = document.body.dataset.page;
      target.className = "site-header";
      target.innerHTML = `<div class="nav-wrap">
        <a class="brand" href="index.html"><img src="assets/logo/commando-mark.svg" alt="" /><span>COMMando<small>Fitness · Rajgarh</small></span></a>
        <nav class="nav-links" id="primary-navigation" aria-label="Main navigation">${links.map(([label, href, key]) => `<a href="${href}" ${current === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
        <div class="nav-actions"><button class="bell-button" id="notification-toggle" type="button" aria-expanded="false" aria-controls="notification-popover" aria-label="Open notifications">🔔<span class="unread-count" id="unread-count">0</span></button><a class="btn btn-primary join-link" href="fees.html">Join now</a><button class="mobile-menu-toggle" id="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open menu">☰</button></div>
      </div><section class="notification-popover" id="notification-popover" hidden aria-label="Latest notifications"></section>`;
    },
    renderFooter() {
      const target = document.querySelector("#site-footer");
      if (!target) return;
      const config = window.CommandoData?.config || {};
      const name = escapeHtml(config.name || "COMMando Fitness Gym");
      const area = escapeHtml(config.area || "Rajgarh");
      const address = escapeHtml(config.address || "Placeholder address");
      const phoneNote = escapeHtml(config.phoneNote || "Contact details available on Google Maps.");
      const hours = escapeHtml(config.hours || "Check opening hours before visiting.");
      const instagram = escapeHtml(config.instagramHandle || "");
      const instagramUrl = escapeHtml(config.instagramUrl || "#");
      target.className = "site-footer";
      target.innerHTML = `<div class="footer-inner">
        <div><a class="brand" href="index.html"><img src="assets/logo/commando-mark.svg" alt="" /><span>${name}<small>Fitness · ${area}</small></span></a><p>A local destination for strength, fitness and consistency.</p></div>
        <div><h3>Explore</h3><ul><li><a href="machines.html">Machines</a></li><li><a href="goals.html">Fitness goals</a></li><li><a href="fees.html">Membership plans</a></li><li><a href="surveys.html">Surveys</a></li></ul></div>
        <div><h3>Visit us</h3><ul><li><a href="${escapeHtml(config.mapsUrl || "contact.html")}" target="_blank" rel="noopener noreferrer">${address}</a></li><li>${phoneNote}</li><li>${hours}</li></ul></div>
        <div><h3>Follow & contact</h3><ul><li><a class="instagram-link" href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Follow COMMando Fitness on Instagram"><svg class="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.2-3.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/></svg><span>@${instagram}</span></a></li><li><a href="contact.html">Send an enquiry</a></li><li><a href="admin/login.html">Admin prototype</a></li></ul></div>
      </div><div class="footer-bottom">© ${new Date().getFullYear()} ${name} · Static frontend prototype</div>`;
    },
    renderBanner() {
      const target = document.querySelector("#notification-banner");
      if (!target) return;
      const item = (window.CommandoData?.getNotifications() || []).find((notification) => notification.status === "Published" && notification.banner);
      if (!item || sessionStorage.getItem(`commando_banner_dismissed_${item.id}`)) return;
      target.innerHTML = `<aside class="notice-banner"><div><strong>${escapeHtml(item.priority)}</strong><p>${escapeHtml(item.message)}</p></div><a class="text-link" href="notifications.html">View notice</a><button type="button" aria-label="Dismiss notification banner">×</button></aside>`;
      target.querySelector("button").addEventListener("click", () => {
        sessionStorage.setItem(`commando_banner_dismissed_${item.id}`, "1");
        target.replaceChildren();
      });
    },
    toast(message) {
      let region = document.querySelector(".toast-region");
      if (!region) { region = document.createElement("div"); region.className = "toast-region"; region.setAttribute("aria-live", "polite"); document.body.append(region); }
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = message;
      region.append(toast);
      window.setTimeout(() => toast.remove(), 3500);
    }
  };
})();
