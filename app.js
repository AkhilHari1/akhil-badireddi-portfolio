/* ========================================
   AKHIL BADIREDDI — PORTFOLIO
   Interactive behaviors (vanilla JS)
   ======================================== */

(function () {
  "use strict";

  // ---------- Dynamic Year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Mobile Navigation ----------
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // ---------- Project Tabs ----------
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function showTab(tabId) {
    tabBtns.forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive);
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === `panel-${tabId}`;
      panel.classList.toggle("active", isActive);
    });
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      showTab(btn.dataset.tab);
    });
  });

  // ---------- Case File Modals ----------
  const modalsContainer = document.querySelector(".modals");
  const caseBtns = document.querySelectorAll(".case-btn");
  const closeBtns = document.querySelectorAll("[data-close]");

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modalsContainer.classList.add("open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeAllModals() {
    modalsContainer.classList.remove("open");
    document.querySelectorAll(".modal").forEach((m) => {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
  }

  caseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.modal);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  // Click backdrop to close
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", closeAllModals);
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // ---------- Case File Accordions ----------
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true";
      const contentId = header.getAttribute("aria-controls");
      const content = document.getElementById(contentId);

      header.setAttribute("aria-expanded", !expanded);
      if (content) {
        content.hidden = expanded;
      }
    });
  });

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.borderBottomWidth = "1px";
    } else {
      navbar.style.borderBottomWidth = "2px";
    }
  });
})();