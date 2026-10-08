import { ADMIN_EMAIL, auth, authentication } from "../firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#admin-login-form");
  const status = document.querySelector("#admin-login-status");
  const button = form?.querySelector('button[type="submit"]');
  if (!form || !status || !button) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const email = String(new FormData(form).get("email")).trim().toLowerCase();
    const password = String(new FormData(form).get("password"));
    if (email !== ADMIN_EMAIL) {
      status.className = "status-text error";
      status.textContent = "This account is not authorized for gym administration.";
      return;
    }
    button.disabled = true;
    button.textContent = "Signing in…";
    status.className = "status-text";
    status.textContent = "Checking your admin account…";
    try {
      const credential = await authentication.signInWithEmailAndPassword(auth, email, password);
      if (credential.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await authentication.signOut(auth);
        throw new Error("This account is not authorized for gym administration.");
      }
      location.replace("index.html");
    } catch (error) {
      status.className = "status-text error";
      status.textContent = error.message.startsWith("This account")
        ? error.message
        : "Sign-in failed. Check the admin email and password, then try again.";
      button.disabled = false;
      button.textContent = "Login";
    }
  });
});
