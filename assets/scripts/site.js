(() => {
  const bodyPage = document.body.getAttribute("data-page");
  const navLinks = [...document.querySelectorAll(".main-nav a[data-nav]")];
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === bodyPage);
  });

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".main-nav");
  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => nav?.classList.remove("open"));
  });

  const topNav = document.querySelector(".top-nav");
  const onScroll = () => {
    topNav?.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reveal = [...document.querySelectorAll(".fade-in")];
  if (reveal.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    reveal.forEach((node) => obs.observe(node));
  }
})();
