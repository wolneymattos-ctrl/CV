(() => {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  const toTop = document.getElementById("toTop");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 40);
    toTop?.classList.toggle("visible", y > 420);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger?.addEventListener("click", () => {
    const open = menu?.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      burger?.setAttribute("aria-expanded", "false");
      if (burger) burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const sections = document.querySelectorAll("section[id], header[id]");
  const menuLinks = document.querySelectorAll(".nav-menu a[href^='#']");

  const setActiveLink = () => {
    let current = "inicio";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 140) {
        current = section.id;
      }
    });
    menuLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("active", href === current);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  const meters = document.querySelectorAll(".meter");
  const meterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          meterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );
  meters.forEach((el) => meterObserver.observe(el));
})();
