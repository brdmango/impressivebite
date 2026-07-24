/* ==========================================================================
   ImpressiveBite — site behaviour
   Vanilla JS, no dependencies, safe to load with `defer`.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Config ------------------------------------------------------------
     Set FORM_ENDPOINT to your form handler (Formspree, Netlify Forms with an
     AJAX endpoint, your own API, etc.). While it is null the form falls back
     to opening the visitor's mail client with the request pre-filled, so the
     site is still usable on day one. See README.md.
     -------------------------------------------------------------------- */
  var FORM_ENDPOINT = null;
  var CONTACT_EMAIL = "orders@impressivebite.com";

  /* --- Mobile navigation ------------------------------------------------ */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* --- Sticky header shadow --------------------------------------------- */

  var header = document.querySelector(".site-header");
  if (header) {
    var setStuck = function () {
      header.classList.toggle("is-stuck", window.scrollY > 4);
    };
    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
  }

  /* --- Scroll reveal ----------------------------------------------------- */

  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if (!("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -60px 0px", threshold: 0.08 });

      revealables.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
        observer.observe(el);
      });
    }
  }

  /* --- Current year ------------------------------------------------------ */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Prefill product interest from ?product= --------------------------- */

  var params = new URLSearchParams(window.location.search);
  var wanted = params.get("product");
  if (wanted) {
    var box = document.querySelector('input[name="products"][value="' + CSS.escape(wanted) + '"]');
    if (box) box.checked = true;
  }

  /* --- Request form ------------------------------------------------------ */

  var form = document.getElementById("request-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  function showError(field, message) {
    field.setAttribute("aria-invalid", "true");
    var msg = document.getElementById(field.id + "-error");
    if (msg) {
      msg.textContent = message;
      msg.classList.add("is-visible");
    }
  }

  function clearError(field) {
    field.removeAttribute("aria-invalid");
    var msg = document.getElementById(field.id + "-error");
    if (msg) msg.classList.remove("is-visible");
  }

  function validate() {
    var firstBad = null;

    form.querySelectorAll("[required]").forEach(function (field) {
      clearError(field);
      var value = field.value.trim();

      if (!value) {
        showError(field, "This field is required.");
        firstBad = firstBad || field;
        return;
      }
      if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(field, "Enter a valid email address.");
        firstBad = firstBad || field;
      }
    });

    return firstBad;
  }

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status is-visible form-status--" + kind;
  }

  function mailtoFallback(data) {
    var lines = [];
    data.forEach(function (value, key) {
      if (key === "company_website" || !String(value).trim()) return;
      lines.push(key.replace(/_/g, " ") + ": " + value);
    });

    var href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("Sample / quote request — " + (data.get("practice") || "New practice")) +
      "&body=" + encodeURIComponent(lines.join("\n"));

    window.location.href = href;
    setStatus(
      "Your email app should open with the request ready to send. If nothing happened, email " +
      CONTACT_EMAIL + " directly.",
      "ok"
    );
  }

  form.addEventListener("input", function (e) {
    if (e.target.hasAttribute("aria-invalid")) clearError(e.target);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var firstBad = validate();
    if (firstBad) {
      setStatus("Please correct the highlighted fields.", "err");
      firstBad.focus();
      return;
    }

    var data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans never see them.
    if (String(data.get("company_website") || "").trim()) return;

    if (!FORM_ENDPOINT) {
      mailtoFallback(data);
      return;
    }

    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    fetch(FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed with status " + res.status);
        form.reset();
        setStatus(
          "Thank you — your request is in. A rep will follow up within one business day.",
          "ok"
        );
      })
      .catch(function () {
        setStatus(
          "Something went wrong sending the form. Please email " + CONTACT_EMAIL + " and we'll take care of it.",
          "err"
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
