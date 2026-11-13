/* ========================================
   AKHIL BADIREDDI — PORTFOLIO
   Interactive behaviors (vanilla JS)
   Custom cursor · Magnetic physics · Scroll reveal
   Fluid filtering · Case-file modals
   ======================================== */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Dynamic Year ----------
  (function setYear() {
    const yearEl = $("#year");
    if (yearEl) {
      try {
        yearEl.textContent = new Date().getFullYear();
      } catch (e) {
        /* noop */
      }
    }
  })();

  // ---------- Mobile Navigation ----------
  (function initMobileNav() {
    const navToggle = $("#nav-toggle");
    const navMenu = $("#nav-menu");
    const navLinks = $$(".nav-link");

    if (!navToggle || !navMenu) return;

    function setExpanded(isOpen) {
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    function toggleMenu() {
      const isOpen = navMenu.classList.toggle("open");
      setExpanded(isOpen);
    }

    navToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        setExpanded(false);
      });
    });
  })();

  // ---------- Custom Cursor + Magnetic Physics ----------
  (function initCursor() {
    if (isTouch || prefersReduced) {
      $$("[data-cursor], [data-cursor-follower]").forEach((el) => {
        el.style.display = "none";
      });
      return;
    }

    const cursor = $("div[data-cursor]");
    const follower = $("div[data-cursor-follower]");
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let visible = false;

    document.body.classList.add("cursor-active");

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        cursor.style.display = "block";
        follower.style.display = "block";
        visible = true;
      }
    });

    function lerp(start, end, t) {
      return start + (end - start) * t;
    }

    function animate() {
      followerX = lerp(followerX, mouseX, 0.14);
      followerY = lerp(followerY, mouseY, 0.14);
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
      requestAnimationFrame(animate);
    }
    animate();

    const magnetic = $$("[data-magnetic], .magnetic, .btn, .tag, .filter-btn, .social-link, .card-link, .nav-link");

    function enterMagnetic() {
      follower.classList.add("hover");
      follower.style.borderColor = "var(--accent-2)";
      follower.style.background = "rgba(245, 158, 11, 0.08)";
    }
    function leaveMagnetic() {
      follower.classList.remove("hover");
      follower.style.borderColor = "";
      follower.style.background = "";
    }

    magnetic.forEach((el) => {
      el.addEventListener("mouseenter", enterMagnetic);
      el.addEventListener("mouseleave", leaveMagnetic);
    });
  })();

  // ---------- Scroll Reveal ----------
  (function initReveal() {
    if (prefersReduced) {
      $$("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.classList.add("reveal");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    $$("[data-reveal]").forEach((el) => observer.observe(el));

    // Stagger groups
    $$(".reveal-group").forEach((group) => {
      observer.observe(group);
      group.addEventListener("reveal", () => {
        $$("> *", group.parentElement || group).forEach((child, i) => {
          child.style.transitionDelay = i * 0.1 + "s";
        });
      });
    });
  })();

  // ---------- Project Filtering (fluid) ----------
  (function initFilters() {
    const btns = $$(".filter-btn");
    const cards = $$(".project-card");
    if (!btns.length || !cards.length) return;

    function showCard(card, show) {
      card.classList.remove("fade-in", "fade-out");
      if (show) {
        card.classList.remove("hidden");
        // Force reflow then animate in
        requestAnimationFrame(() => {
          card.classList.add("fade-in");
        });
      } else {
        card.classList.add("fade-out");
        setTimeout(() => card.classList.add("hidden"), 300);
      }
    }

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        btns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });

        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          showCard(card, match);
        });
      });
    });
  })();

  // ---------- Case-file Modals ----------
  (function initModals() {
    const modalsContainer = $("#modals");
    const closeBtns = $$("[data-close]");
    const caseBtns = $$(".project-card");

    if (!modalsContainer) return;

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
      $$(".modal").forEach((m) => {
        m.classList.remove("is-open");
        m.setAttribute("aria-hidden", "true");
      });
      // Reset accordions on close
      $$(".accordion-header").forEach((h) => {
        h.setAttribute("aria-expanded", "false");
      });
      $$(".accordion-content").forEach((c) => {
        c.hidden = true;
      });
      document.body.style.overflow = "";
    }

    caseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(btn.dataset.modal);
      });
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener("click", closeAllModals);
    });

    // Backdrop click
    modalsContainer.addEventListener("click", (e) => {
      if (e.target === modalsContainer) closeAllModals();
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllModals();
    });
  })();

  // ---------- Case-file Accordions ----------
  (function initAccordions() {
    $$(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        const expanded = header.getAttribute("aria-expanded") === "true";
        const contentId = header.getAttribute("aria-controls");
        const content = document.getElementById(contentId);

        header.setAttribute("aria-expanded", String(!expanded));
        if (content) {
          content.hidden = expanded;
        }
      });
    });
  })();

  // ---------- Navbar Scroll Effect ----------
  (function initNavbarScroll() {
    const navbar = $("#navbar");
    if (!navbar) return;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            navbar.style.borderBottomWidth = "1px";
          } else {
            navbar.style.borderBottomWidth = "1px";
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  })();

  // ---------- Global error handler (log to console, never crash UI) ----------
  window.addEventListener(
    "error",
    (e) => {
      try {
        console.error("[Portfolio] Uncaught error:", e.message);
      } catch (_) {
        /* noop */
      }
    },
    true
  );
})();
