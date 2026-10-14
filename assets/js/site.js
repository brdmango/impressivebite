/* ==========================================================================
   ImpressiveBite — site behaviour
   Vanilla JS, no dependencies, safe to load with `defer`.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Config ------------------------------------------------------------
     Submission is chosen in this order:

       1. The form carries data-netlify="true" → post back to this same page,
          URL-encoded, which is what Netlify Forms expects for AJAX. Nothing to
          configure; it works as soon as the site is deployed to Netlify.
       2. FORM_ENDPOINT is set → post FormData there (Formspree, Basin, your
          own API).
       3. Neither → open the visitor's mail client with the request pre-filled,
          so the form is never a dead end, including on local file:// previews.

     See README.md.
     -------------------------------------------------------------------- */
  var FORM_ENDPOINT = null;
  var CONTACT_EMAIL = "hello@impressivebite.com";

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

  /* --- Prefill service interest from ?service= ---------------------------
     The "Request pricing" buttons on each catalog section link here, so the
     form arrives with that case type already checked. */

  var params = new URLSearchParams(window.location.search);
  var wanted = params.get("service");
  if (wanted) {
    var box = document.querySelector('input[name="services"][value="' + CSS.escape(wanted) + '"]');
    if (box) box.checked = true;
  }

  /* --- Price list filter -------------------------------------------------
     The filter box ships hidden and is revealed here, so it never appears
     without the JavaScript that makes it work. Rows and whole category groups
     hide as you type; an empty result gets its own message. */

  var search = document.getElementById("price-search");
  if (search) {
    document.querySelectorAll("[data-needs-js]").forEach(function (el) {
      el.hidden = false;
    });

    var rows = [].slice.call(document.querySelectorAll("[data-row]"));
    var groups = [].slice.call(document.querySelectorAll("[data-group]"));
    var count = document.getElementById("price-count");
    var empty = document.getElementById("price-empty");
    var catNav = document.querySelector(".cat-nav");
    var total = rows.length;

    var filter = function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;

      rows.forEach(function (row) {
        var hit = !q || row.dataset.search.indexOf(q) !== -1;
        row.hidden = !hit;
        if (hit) shown++;
      });

      // A category with nothing left in it shouldn't keep its heading.
      groups.forEach(function (group) {
        group.hidden = !group.querySelector("[data-row]:not([hidden])");
      });

      if (empty) empty.hidden = shown !== 0;
      if (catNav) catNav.hidden = !!q;
      if (count) {
        count.textContent = q
          ? shown + " of " + total + " items"
          : "";
      }
    };

    search.addEventListener("input", filter);
    search.addEventListener("search", filter);   // fires on the clear button
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
      "?subject=" + encodeURIComponent("Lab inquiry — " + (data.get("practice") || "New practice")) +
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

    var useNetlify = form.hasAttribute("data-netlify");

    if (!useNetlify && !FORM_ENDPOINT) {
      mailtoFallback(data);
      return;
    }

    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    // Netlify wants a URL-encoded body posted to a path on the same site.
    // URLSearchParams preserves repeated keys, so multi-checkbox `products`
    // arrives as several values rather than one collapsed field.
    var request = useNetlify
      ? [window.location.pathname, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString()
        }]
      : [FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        }];

    fetch(request[0], request[1])
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed with status " + res.status);
        form.reset();
        setStatus(
          "Thanks — that's with us. Someone from the lab will come back to you within one business day.",
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
