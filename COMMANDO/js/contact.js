(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const config = CommandoData.config;
    const address = document.querySelector("#gym-address");
    if (address) address.textContent = `${config.name}, ${config.address}`;
    const directions = document.querySelector("#directions-link");
    if (directions) directions.href = config.mapsDirectionsUrl;
    const mapsLink = document.querySelector("#maps-link");
    if (mapsLink) mapsLink.href = config.mapsUrl;
    const instagram = document.querySelector(".contact-card .instagram-link");
    if (instagram) {
      instagram.href = config.instagramUrl;
      const handle = instagram.querySelector("span");
      if (handle) handle.textContent = `@${config.instagramHandle}`;
    }
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#contact-status");
    if (!form || !status) return;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.className = "status-text error";
      if (!form.reportValidity()) { status.textContent = "Please check the required fields."; return; }
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = "Sending…";
      status.className = "status-text";
      status.textContent = "Sending your enquiry…";
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        const result = await response.json();
        if (!response.ok) {
          const details = Array.isArray(result.errors) ? result.errors.map((error) => error.message).join(" ") : "";
          throw new Error(details || "Form submission failed.");
        }
        form.reset();
        status.className = "status-text success";
        status.textContent = "Thanks! Your enquiry has been sent. We’ll get back to you soon.";
      } catch (error) {
        status.className = "status-text error";
        status.textContent = error instanceof TypeError
          ? "We couldn’t reach the form service. Please check your connection and try again."
          : `We couldn’t send your enquiry. ${error.message} Please try again or contact us on Instagram.`;
      } finally {
        submit.disabled = false;
        submit.textContent = "Send enquiry";
      }
    });
  });
})();
