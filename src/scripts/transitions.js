// Enhanced page transitions

// Track listeners for cleanup on navigation
let parallaxCleanup = null;

document.addEventListener("astro:page-load", () => {
  // Clean up previous parallax listener if any
  if (parallaxCleanup) {
    parallaxCleanup();
    parallaxCleanup = null;
  }

  // Add animation classes to elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]");

  animatedElements.forEach((element, index) => {
    const animationType = element.getAttribute("data-animate");
    const delay = element.getAttribute("data-delay") || index * 100;

    element.style.animationDelay = `${delay}ms`;

    setTimeout(() => {
      element.classList.add(animationType);
      element.classList.add("animated");
    }, 10);
  });

  // Parallax effect with throttle and cleanup
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length > 0) {
    let ticking = false;

    const handleParallax = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        parallaxElements.forEach((element) => {
          const speed = element.getAttribute("data-parallax") || 0.1;
          const yPos = -(window.scrollY * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleParallax, { passive: true });

    // Store cleanup function
    parallaxCleanup = () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (!targetId) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const offsetTop =
        targetElement.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Page transition effects
  const pageTransitionElements = document.querySelectorAll(
    "[data-page-transition]"
  );

  pageTransitionElements.forEach((element) => {
    const transitionType = element.getAttribute("data-page-transition");
    element.classList.add(`transition-${transitionType}`);
  });
});

// Handle navigation events
document.addEventListener(
  "astro:before-preparation",
  ({ from, to, direction }) => {
    if (from && to) {
      const fromPath = new URL(from).pathname;
      const toPath = new URL(to).pathname;

      const fromDepth = fromPath.split("/").filter(Boolean).length;
      const toDepth = toPath.split("/").filter(Boolean).length;

      let navDirection = "same";

      if (toDepth > fromDepth) {
        navDirection = "deeper";
      } else if (toDepth < fromDepth) {
        navDirection = "shallower";
      }

      localStorage.setItem("navigationDirection", navDirection);
    }
  }
);

// Apply direction-specific transitions
document.addEventListener("astro:page-load", () => {
  const navDirection = localStorage.getItem("navigationDirection");

  if (navDirection) {
    document.documentElement.setAttribute("data-navigation", navDirection);

    setTimeout(() => {
      localStorage.removeItem("navigationDirection");
    }, 1000);
  }
});
