(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    const data = window.CommandoData;
    const ui = window.CommandoUI;
    const why = document.querySelector("#why-cards");
    if (!data || !why) return;
    try {
      await data.loadCloudContent();
    } catch (error) {
      console.error("Firebase content could not be loaded:", error);
    }
    why.innerHTML = [
      ["01", "Discipline", "Create a routine you can return to, one session at a time."],
      ["02", "Consistency", "Small, repeatable efforts are a foundation for lasting progress."],
      ["03", "Strength", "Build practical strength with thoughtful, controlled training."],
      ["04", "Progress", "Focus on your own next step and celebrate steady improvement."]
    ].map(([number, title, text]) => `<article class="feature-card"><span class="card-symbol">${number}</span><h3>${ui.escapeHtml(title)}</h3><p>${ui.escapeHtml(text)}</p></article>`).join("");

    const machines = document.querySelector("#featured-machines");
    if (machines) machines.innerHTML = data.getMachines().filter((item) => item.status === "Published").slice(0, 3).map((item) => `<article class="machine-card"><div class="machine-art"><img src="${ui.escapeHtml(item.image)}" alt="${ui.escapeHtml(item.name)} equipment photo" loading="lazy" /></div><div class="machine-copy"><span class="badge">${ui.escapeHtml(item.category)}</span><h3>${ui.escapeHtml(item.name)}</h3><p>${ui.escapeHtml(item.muscles)}</p><a class="text-link" href="machine.html?id=${encodeURIComponent(item.id)}">View machine →</a></div></article>`).join("");

    const notices = document.querySelector("#home-notifications");
    if (notices) notices.innerHTML = data.getNotifications().filter((item) => item.status === "Published").slice(0, 3).map((item) => `<article class="notification-card"><div><span class="badge ${item.priority.toLowerCase()}">${ui.escapeHtml(item.type)}</span><h3>${ui.escapeHtml(item.title)}</h3><p>${ui.escapeHtml(item.message)}</p></div><div class="notification-meta">${ui.escapeHtml(item.date || "Demo")}</div></article>`).join("") || `<div class="empty-state">No notifications yet.</div>`;

    const startingPrice = document.querySelector("#home-starting-price");
    const monthlyPlan = data.getFees().find((plan) => plan.id === "monthly" && plan.status === "Published");
    if (startingPrice && monthlyPlan) startingPrice.textContent = `${monthlyPlan.price}/month`;
  });
})();
