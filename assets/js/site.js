document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.querySelector("#mobile-menu");
  const backdrop = document.querySelector("[data-backdrop]");
  const lightbox = document.querySelector("#lightbox");

  function resetDropdowns() {
    document.querySelectorAll(".mobile-dropdown-toggle").forEach(button => {
      button.setAttribute("aria-expanded", "false");
      const target = document.getElementById(button.getAttribute("aria-controls"));
      if (target) target.hidden = true;
    });
  }
  function closeMenu() {
    if (panel) { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); }
    if (backdrop) backdrop.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("locked");
    resetDropdowns();
  }
  function openMenu() {
    if (!panel) return;
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.classList.add("open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("locked");
  }
  if (toggle) toggle.addEventListener("click", () => panel && panel.classList.contains("open") ? closeMenu() : openMenu());
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.querySelectorAll(".panel-close, .mobile-nav a").forEach(item => item.addEventListener("click", closeMenu));
  document.querySelectorAll(".mobile-dropdown-toggle").forEach(button => button.addEventListener("click", () => {
    const target = document.getElementById(button.getAttribute("aria-controls"));
    if (!target) return;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    target.hidden = !open;
  }));

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  }
  document.querySelectorAll("[data-gallery-src]").forEach(button => button.addEventListener("click", () => {
    if (!lightbox) return;
    const image = lightbox.querySelector("img");
    image.src = button.dataset.gallerySrc; image.alt = button.dataset.galleryAlt || "Completed landscaping project";
    lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false"); document.body.classList.add("locked");
  }));
  const close = document.querySelector(".lightbox-close");
  if (close) close.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeMenu(); closeLightbox(); } });
});
