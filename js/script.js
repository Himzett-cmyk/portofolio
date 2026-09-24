document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll("section");

  if (sections.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    const hiddenStyle = {
      opacity: "0",
      transform: "translateY(24px)",
      transition: "opacity 0.5s ease, transform 0.5s ease"
    };

    sections.forEach((section) => Object.assign(section.style, hiddenStyle));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const topButton = document.createElement("button");
  topButton.textContent = "Back to top ↑";
  topButton.setAttribute("aria-label", "Kembali ke atas");
  Object.assign(topButton.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    padding: "10px 16px",
    border: "3px solid #111",
    background: "#ffd700",
    color: "#111",
    fontWeight: "bold",
    fontFamily: "inherit",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: "4px 4px 0 #111",
    opacity: "0",
    visibility: "hidden",
    transition: "opacity 0.2s ease, transform 0.1s ease",
    zIndex: "999"
  });
  document.body.appendChild(topButton);

  let topButtonVisible = false;
  const toggleTopButton = () => {
    const shouldShow = window.scrollY > 400;
    if (shouldShow !== topButtonVisible) {
      topButtonVisible = shouldShow;
      topButton.style.opacity = shouldShow ? "1" : "0";
      topButton.style.visibility = shouldShow ? "visible" : "hidden";
    }
  };

  topButton.addEventListener("mousedown", () => {
    topButton.style.boxShadow = "none";
    topButton.style.transform = "translate(4px, 4px)";
  });
  topButton.addEventListener("mouseup", () => {
    topButton.style.boxShadow = "4px 4px 0 #111";
    topButton.style.transform = "none";
  });
  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleTopButton, { passive: true });
  toggleTopButton();
});