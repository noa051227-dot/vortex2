// =========================
// 初めての方へ（U12/U14）モバイル用トグル
// =========================
function initFirstTimeToggle() {
  const btn = document.querySelector(".firsttime-toggle");
  const sub = document.getElementById("mobile-firsttime-sub");
  if (!btn || !sub) return;

  // 初期状態は閉じる
  sub.style.display = "none";
  btn.setAttribute("aria-expanded", "false");
  btn.classList.remove("is-open");

  btn.addEventListener("click", () => {
    const isOpen = sub.style.display === "block";
    sub.style.display = isOpen ? "none" : "block";
    btn.classList.toggle("is-open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
}

// =========================
// ハンバーガー開閉時：スクロールロック＋サブメニューリセット
// =========================
function initNavToggle() {
  const navToggle = document.getElementById("nav-toggle");
  if (!navToggle) return;

  const sync = () => {
    document.body.classList.toggle("nav-open", navToggle.checked);

    // 閉じたときはU12/U14も閉じる
    if (!navToggle.checked) {
      const btn = document.querySelector(".firsttime-toggle");
      const sub = document.getElementById("mobile-firsttime-sub");
      if (btn && sub) {
        sub.style.display = "none";
        btn.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    }
  };

  navToggle.addEventListener("change", sync);
  sync();
}

// =========================
// ヘッダーに影（固定ヘッダー用）
// =========================
function initHeaderShadow() {
  const header = document.querySelector("header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 4) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// =========================
// スケジュールページ：表と地図の高さ調整（あれば）
// =========================
function adjustMapHeights() {
  document.querySelectorAll(".activity-flex").forEach((sec) => {
    const table = sec.querySelector(".activity-table");
    const iframe = sec.querySelector(".map-box iframe");
    if (!table || !iframe) return;

    if (window.innerWidth > 900) {
      iframe.style.height = table.offsetHeight + "px";
    } else {
      iframe.style.height = "320px";
    }
  });
}

// =========================
// 初期化
// =========================
document.addEventListener("DOMContentLoaded", () => {
  initFirstTimeToggle();
  initNavToggle();
  initHeaderShadow();
});

window.addEventListener("load", adjustMapHeights);
window.addEventListener("resize", adjustMapHeights);
