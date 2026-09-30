/* ==========================================================
   SEAZO — shared script
   Change contact details HERE ONLY. Every WhatsApp link,
   call link, email link, shown number and the contact form
   use this object.
   ========================================================== */
const CONTACT = {
  phoneDisplay: "+91 93631 99319",
  phoneLink: "919363199319",
  email: "seazoindia@gmail.com",
  instagram: "https://www.instagram.com/seazo.india/",
  instagramHandle: "@seazo.india"
};

const DEFAULT_WA_TEXT = "Hi Seazo! I'd like to know more about a website / Instagram promotion for my business.";
const EMAIL_SUBJECT = "Enquiry from Seazo website";

document.documentElement.classList.add("js");

function waLink(text) {
  return "https://wa.me/" + CONTACT.phoneLink + "?text=" + encodeURIComponent(text || DEFAULT_WA_TEXT);
}

// Phones and touch devices open the mail app; desktops open Gmail in the browser.
function isMobileDevice() {
  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}
function emailLink() {
  const subject = encodeURIComponent(EMAIL_SUBJECT);
  return isMobileDevice()
    ? "mailto:" + CONTACT.email + "?subject=" + subject
    : "https://mail.google.com/mail/?view=cm&fs=1&to=" + CONTACT.email + "&su=" + subject;
}

/* ---------- Contact links ---------- */
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = waLink(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
});
document.querySelectorAll("[data-tel]").forEach((el) => {
  el.href = "tel:+" + CONTACT.phoneLink;
});
document.querySelectorAll("[data-phone]").forEach((el) => {
  el.textContent = CONTACT.phoneDisplay;
});
document.querySelectorAll("[data-email]").forEach((el) => {
  el.href = emailLink();
  if (el.href.startsWith("https:")) { el.target = "_blank"; el.rel = "noopener"; }
  else { el.removeAttribute("target"); }
});
document.querySelectorAll("[data-email-text]").forEach((el) => {
  el.textContent = CONTACT.email;
});
document.querySelectorAll("[data-ig]").forEach((el) => {
  el.href = CONTACT.instagram;
  el.target = "_blank";
  el.rel = "noopener";
});
document.querySelectorAll("[data-ig-handle]").forEach((el) => {
  el.textContent = CONTACT.instagramHandle;
});

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Header: shadow on scroll ---------- */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("nav-open", open); // locks page scroll (styles.css)
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", () => setOpen(false));
}

/* ---------- Floating WhatsApp: step aside so it never covers the footer, the form's send
   button, or the page's own button rows (which already have a WhatsApp button) ---------- */
const waFloat = document.querySelector(".wa-float");
const waAvoid = document.querySelectorAll(".site-footer, .form-foot, .hero .btn-row, .cta-box .btn-row");
if (waFloat && waAvoid.length && "IntersectionObserver" in window) {
  const onScreen = new Set();
  const waIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
    waFloat.classList.toggle("is-hidden", onScreen.size > 0);
  });
  waAvoid.forEach((el) => waIO.observe(el));
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ---------- Portfolio filter ---------- */
const filterBtns = document.querySelectorAll(".filter-btn");
const workItems = document.querySelectorAll(".work-item");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    workItems.forEach((item) => {
      const show = f === "all" || item.dataset.cat.split(" ").includes(f);
      item.classList.toggle("is-hidden", !show);
      if (show) item.classList.add("is-visible");
    });
  });
});

/* ---------- Portfolio modal ---------- */
const modal = document.getElementById("work-modal");
if (modal) {
  const content = modal.querySelector(".modal-content");
  let lastTrigger = null;

  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tpl = document.getElementById(btn.dataset.project);
      if (!tpl) return;
      lastTrigger = btn;
      content.replaceChildren(tpl.content.cloneNode(true));
      modal.showModal();
    });
  });

  modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
  // Close when clicking the dark backdrop
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", () => { if (lastTrigger) lastTrigger.focus(); });
}

/* ---------- Contact form -> WhatsApp ---------- */
const form = document.getElementById("quote-form");
if (form) {
  const showError = (input, msg) => {
    const err = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.name;
    const phone = form.elements.phone;
    let ok = true;

    if (!name.value.trim()) { showError(name, "Please enter your name."); ok = false; }
    else showError(name, "");

    const digits = phone.value.replace(/\D/g, "");
    if (digits.length < 10) { showError(phone, "Please enter a valid phone / WhatsApp number."); ok = false; }
    else showError(phone, "");

    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }

    const needs = [...form.querySelectorAll('input[name="needs"]:checked')].map((c) => c.value);
    const lines = [
      "Hi Seazo! I'd like a free quote.",
      "",
      "*Name:* " + name.value.trim(),
      "*Business:* " + (form.elements.business.value.trim() || "-"),
      "*Phone/WhatsApp:* " + phone.value.trim(),
      "*Type of business:* " + (form.elements.type.value || "-"),
      "*I need:* " + (needs.length ? needs.join(", ") : "-"),
    ];
    const msg = form.elements.message.value.trim();
    if (msg) lines.push("*Message:* " + msg);

    const url = waLink(lines.join("\n"));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked: open in this tab
  });
}
