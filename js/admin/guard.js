import { ADMIN_EMAIL, auth, authentication } from "../firebase.js";

window.CommandoAdminReady = (async () => {
  try {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = authentication.onAuthStateChanged(auth, (currentUser) => {
        unsubscribe();
        resolve(currentUser);
      }, reject);
    });
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
      if (user) await authentication.signOut(auth);
      location.replace("login.html");
      return false;
    }

    const header = document.querySelector(".admin-topbar");
    if (header) {
      const button = document.createElement("button");
      button.className = "btn btn-secondary";
      button.type = "button";
      button.textContent = "Sign out";
      button.addEventListener("click", async () => {
        button.disabled = true;
        try {
          await authentication.signOut(auth);
          location.replace("login.html");
        } catch (error) {
          button.disabled = false;
          window.CommandoUI?.toast(`Unable to sign out: ${error.message}`);
        }
      });
      header.append(button);
    }

    await window.CommandoData.loadCloudContent();
    document.body.style.visibility = "visible";
    return true;
  } catch (error) {
    console.error("Firebase content could not be loaded:", error);
    document.body.style.visibility = "visible";
    const warning = document.createElement("p");
    warning.className = "status-text error admin-cloud-error";
    warning.setAttribute("role", "alert");
    warning.textContent = `Firebase content could not load. Check that Firestore is created and firestore.rules are published. ${error.message}`;
    document.querySelector("main")?.prepend(warning);
    return false;
  }
})();
