(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const stats = document.querySelector("#admin-stats");
    if (stats && window.CommandoData) {
      const values = [
        ["Total machines", CommandoData.getMachines().length], ["Active surveys", CommandoData.getSurveys().filter((item) => item.status === "Published").length],
        ["Local responses", CommandoData.getSurveyResponses().length], ["Notifications", CommandoData.getNotifications().length], ["Local enquiries", CommandoData.getEnquiries().length]
      ];
      stats.innerHTML = values.map(([label, value]) => `<article class="admin-stat"><strong>${value}</strong><span>${label}</span></article>`).join("");
      const activity = document.querySelector("#admin-activity");
      activity.innerHTML = [["Machine records", values[0][1]], ["Published surveys", values[1][1]], ["Local demo responses", values[2][1]], ["Notifications", values[3][1]]].map(([label, value]) => `<li><span>${label}</span><small>${value} items</small></li>`).join("");
      document.querySelector("#admin-chart").innerHTML = values.map(([label, value]) => `<div class="chart-row"><span>${label}</span><div class="chart-track"><span style="width:${Math.min(100, Number(value) * 12)}%"></span></div><strong>${value}</strong></div>`).join("");
    }
  });
})();
