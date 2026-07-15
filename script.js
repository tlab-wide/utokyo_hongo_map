/* UTokyo Hongo Campus Point Cloud Map — front-end logic
 *
 * Posts the access form to a Google Apps Script web app. On success, the script
 * records the submission (Google Sheet + email) and returns the download links,
 * which are then rendered below. The Drive links are NOT stored in this file or
 * anywhere in the repo — they live only in the Apps Script.
 *
 * SETUP: paste your deployed Apps Script web-app URL below. See README.md.
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxsZTQ9bGqPBR6UAPY6Xr_hwD5Ol-XQV4bNOueAncoWnPtsB9OX1QLW8btXx3F7sBpX/exec";

(function () {
  "use strict";

  const form = document.getElementById("access-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  const downloadsSection = document.getElementById("downloads");
  const downloadList = document.getElementById("download-list");

  function setStatus(message, kind) {
    statusEl.textContent = message || "";
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  function isConfigured() {
    return (
      typeof APPS_SCRIPT_URL === "string" &&
      APPS_SCRIPT_URL.indexOf("http") === 0 &&
      APPS_SCRIPT_URL.indexOf("PASTE_YOUR") === -1
    );
  }

  function renderLinks(links) {
    downloadList.innerHTML = "";
    links.forEach(function (item) {
      const li = document.createElement("li");

      const title = document.createElement("span");
      title.className = "dl-title";
      title.textContent = item.label || "Download";
      li.appendChild(title);

      if (item.note) {
        const note = document.createElement("span");
        note.className = "dl-note";
        note.textContent = item.note;
        li.appendChild(note);
      }

      const a = document.createElement("a");
      a.className = "dl-link";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Open / download";
      li.appendChild(a);

      downloadList.appendChild(li);
    });

    downloadsSection.hidden = false;
    downloadsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Native validation (required fields + checkbox).
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!isConfigured()) {
      setStatus(
        "This form is not yet connected to its backend. (Set APPS_SCRIPT_URL in script.js.)",
        "error"
      );
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      affiliation: form.affiliation.value.trim(),
      purpose: form.purpose.value.trim(),
      agreed: form.agree.checked,
    };

    submitBtn.disabled = true;
    setStatus("Submitting…", null);

    // Use text/plain to avoid a CORS preflight against Apps Script.
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data && data.ok && Array.isArray(data.links)) {
          setStatus("", null);
          form.hidden = true;
          renderLinks(data.links);
        } else {
          throw new Error((data && data.error) || "Unexpected response");
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        setStatus(
          "Something went wrong submitting the form. Please try again, or contact the maintainer.",
          "error"
        );
      });
  });
})();
