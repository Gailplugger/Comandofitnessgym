(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", async () => {
    if (!(await window.CommandoAdminReady)) return;
    const table = document.querySelector("#enquiries-table");
    if (!table) return;
    const esc = CommandoUI.escapeHtml;
    const render = () => {
      table.innerHTML = CommandoData.getEnquiries().map((item) => `<tr><td data-label="Name">${esc(item.name)}</td><td data-label="Phone">${esc(item.phone)}</td><td data-label="Email">${esc(item.email)}</td><td data-label="Message">${esc(item.message)}</td><td data-label="Date">${esc(item.date.slice(0, 10))}</td><td data-label="Status"><select aria-label="Enquiry status" data-status-id="${esc(item.id)}"><option ${item.status === "New" ? "selected" : ""}>New</option><option ${item.status === "Read" ? "selected" : ""}>Read</option><option ${item.status === "Resolved" ? "selected" : ""}>Resolved</option></select></td></tr>`).join("") || `<tr><td colspan="6">No enquiries have been recorded locally yet.</td></tr>`;
    };
    table.addEventListener("change", (event) => {
      const select = event.target.closest("[data-status-id]");
      if (!select) return;
      const item = CommandoData.getEnquiries().find((enquiry) => enquiry.id === select.dataset.statusId);
      if (item) CommandoData.updateEnquiry({ ...item, status: select.value });
    });
    render();
  });
})();
