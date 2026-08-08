

(function () {
  "use strict";

  // ===== LOADER =====
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  });

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  }
  window.addEventListener("scroll", updateNavbar);
  updateNavbar();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      }
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  function highlightNav() {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId,
      );
    });
  }
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // ===== DARK MODE =====
  const darkToggle = document.getElementById("darkToggle");
  const body = document.body;

  if (darkToggle) {
    const icon = darkToggle.querySelector("i");

    // Load saved preference
    if (localStorage.getItem("theme") === "light") {
      body.classList.remove("dark-mode");
      icon.className = "fas fa-moon";
    }

    darkToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ===== ANIMATED COUNTERS =====
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-count"), 10);
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, 20);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObserver.observe(c));

  // ===== FADE UP ON SCROLL =====
  const fadeItems = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );
  fadeItems.forEach((el) => fadeObserver.observe(el));

  // ===== BACK TO TOP =====
  const backBtn = document.getElementById("back-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  });
  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll(".skill-bar-fill");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0%";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ===== PREVIEW MODAL =====
  window.openPreview = function (imageSrc, title, subtitle) {
    const img = document.getElementById("previewModalImg");
    img.src = imageSrc;
    img.style.display = "";
    img.onerror = function () {
      this.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%232C3E50"/><text x="200" y="190" font-family="Playfair Display" font-size="34" fill="%23E67E22" text-anchor="middle">' +
        title +
        '</text><text x="200" y="230" font-family="Inter" font-size="16" fill="%23ffffff" text-anchor="middle" opacity="0.7">' +
        subtitle +
        '</text><text x="200" y="290" font-family="Inter" font-size="13" fill="%23ffffff" text-anchor="middle" opacity="0.5">Screenshot coming soon</text></svg>';
    };
    document.getElementById("previewModalTitle").textContent = title;
    document.getElementById("previewModalSub").textContent =
      subtitle + " · Web Project 2026";
    document.getElementById("previewModal").classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closePreview = function (event) {
    if (event && event.target && event.target.id !== "previewModal") return;
    document.getElementById("previewModal").classList.remove("open");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.getElementById("previewModal").classList.remove("open");
      document.body.style.overflow = "";
    }
  });
})();

