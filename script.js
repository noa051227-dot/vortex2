// script.js（共通）
// ※HTML側の「①②③のDOMContetLoadedブロック」は削除して、これ1本に統一してください。

document.addEventListener("DOMContentLoaded", () => {
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

  // ===== ハンバーガー：body.nav-open 同期 =====
  const navToggle = document.getElementById("nav-toggle");
  const syncNavOpen = () => document.body.classList.toggle("nav-open", !!(navToggle && navToggle.checked));
  if (navToggle) {
    navToggle.addEventListener("change", syncNavOpen);
    syncNavOpen();
  }

  // ===== モバイル：ドロップダウン（初めての方へ / VORTEXとは） =====
  // 二重バインド防止（もしscriptが重複しても壊れにくくする）
  const bindSubmenuButton = (btn, panel) => {
    if (!btn || !panel) return;
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // 他のサブメニューが開いていたら閉じる（スマホでの不具合予防）
      document.querySelectorAll(".mobile-sub.show").forEach((el) => {
        if (el !== panel) el.classList.remove("show");
      });
      document.querySelectorAll(".mobile-panel button.is-open").forEach((b) => {
        if (b !== btn) {
          b.classList.remove("is-open");
          b.setAttribute("aria-expanded", "false");
        }
      });

      const isOpen = panel.classList.toggle("show");
      btn.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  };

  // 1) aria-controls があるボタンはそれを優先（今のHTML構造に強い）
  document.querySelectorAll(".mobile-panel button[aria-controls]").forEach((btn) => {
    const id = btn.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    bindSubmenuButton(btn, panel);
  });

  // 2) 念のため data-toggle の既存仕様にも対応（firsttime / vortex）
  document.querySelectorAll('.mobile-panel button[data-toggle="firsttime"]').forEach((btn) => {
    bindSubmenuButton(btn, document.getElementById("mobile-firsttime-sub"));
  });
  document.querySelectorAll('.mobile-panel button[data-toggle="vortex"]').forEach((btn) => {
    bindSubmenuButton(btn, document.getElementById("mobile-vortex-sub"));
  });

  // ===== GoogleカレンダーURL（メールをHTMLに直書きしない） =====
  // schedule.html 側で data-cal-b64 を設定しておくと、ここで復元してsrcに入れる
  document.querySelectorAll('iframe[data-cal-b64]').forEach((iframe) => {
    if (iframe.getAttribute('src')) return;
    const b64 = iframe.getAttribute('data-cal-b64');
    if (!b64) return;
    try {
      iframe.setAttribute('src', atob(b64));
    } catch (e) {
      // 何もしない
    }
  });

  // ===== リンク押したらメニュー閉じる（ついでにサブも閉じる） =====
  document.querySelectorAll(".mobile-panel a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!navToggle) return;
      navToggle.checked = false;
      syncNavOpen();

      document.querySelectorAll(".mobile-sub.show").forEach((el) => el.classList.remove("show"));
      document.querySelectorAll(".mobile-panel button.is-open").forEach((b) => {
        b.classList.remove("is-open");
        b.setAttribute("aria-expanded", "false");
      });
    });
  });

  // ===== data-href カードをクリックで遷移 =====
  document.querySelectorAll("[data-href]").forEach((el) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    if (!el.hasAttribute("role")) el.setAttribute("role", "link");

    const go = () => {
      const href = el.getAttribute("data-href");
      if (href) window.location.href = href;
    };

    el.addEventListener("click", (e) => {
      if (e.target.closest("a, button, input, textarea, select, summary, label")) return;
      go();
    });

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });
});
