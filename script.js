(() => {
  // ===== 現在ページのナビ強調 =====
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html": "index",
    "firsttime.html": "firsttime",
    "u12.html": "u12",
    "u14.html": "u14",
    "vortex.html": "vortex",
    "program.html": "program",
    "schedule.html": "schedule",
    "contact.html": "contact",
  };
  const key = map[file];

  if (key) {
    document.querySelectorAll(`[data-nav="${key}"]`).forEach((a) => a.classList.add("active"));
  }

  // ===== ハンバーガー開閉：body.nav-open と同期 =====
  const toggle = document.getElementById("nav-toggle");
  const syncNavOpen = () => document.body.classList.toggle("nav-open", !!toggle?.checked);

  if (toggle) {
    syncNavOpen();
    toggle.addEventListener("change", syncNavOpen);
  }

  // ===== モバイル：サブメニュー開閉（複数対応） =====
  document.querySelectorAll("[data-submenu-toggle]").forEach((btn) => {
    const id = btn.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    if (!panel) return;

    btn.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("show");
      btn.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.querySelectorAll(".mobile-panel a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!toggle) return;
      toggle.checked = false;
      syncNavOpen();
      document.querySelectorAll(".mobile-sub.show").forEach((el) => el.classList.remove("show"));
      document.querySelectorAll("[data-submenu-toggle].is-open").forEach((b) => {
        b.classList.remove("is-open");
        b.setAttribute("aria-expanded", "false");
      });
    });
  });
})();
(function () {
  const targets = document.querySelectorAll('[data-href]');

  targets.forEach(el => {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'link');

    const go = () => {
      const href = el.getAttribute('data-href');
      if (href) window.location.href = href;
    };

    el.addEventListener('click', (e) => {
      if (e.target.closest('a, button, input, textarea, select, summary, label')) return;
      go();
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
})();
