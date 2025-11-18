// ===== モバイル：初めての方へ ▾ トグル（重複を自動排除して単一化） =====
function initFirstTimeToggle() {
  // 1) サブメニューの単一化
  const subs = Array.from(document.querySelectorAll('.mobile-sub'));
  if (subs.length > 0) {
    // 先頭だけ残してIDを付与、他は削除
    const keep = subs[0];
    keep.id = 'mobile-sub-firsttime';
    subs.slice(1).forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }

  // 2) トグルボタンの単一化
  const toggles = Array.from(document.querySelectorAll('[data-toggle="firsttime"]'));
  if (toggles.length > 0) {
    const keep = toggles[0];
    keep.id = keep.id || 'firsttime-toggle';
    keep.setAttribute('aria-controls', 'mobile-sub-firsttime');
    toggles.slice(1).forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }

  const btn = document.querySelector('[data-toggle="firsttime"]');
  const sub = document.getElementById('mobile-sub-firsttime');
  if (!btn || !sub) return;

  // 初期状態
  sub.style.display = 'none';
  btn.setAttribute('aria-expanded', 'false');
  btn.classList.remove('is-open');

  // クリックで開閉
  btn.addEventListener('click', () => {
    const open = sub.style.display === 'block';
    sub.style.display = open ? 'none' : 'block';
    btn.classList.toggle('is-open', !open);
    btn.setAttribute('aria-expanded', String(!open));
  });

  // メニューを閉じたらサブも閉じる
  const toggleCheckbox = document.getElementById('nav-toggle');
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', () => {
      if (!toggleCheckbox.checked) {
        sub.style.display = 'none';
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// 背面スクロール抑止（既存）
function initNavScrollLock() {
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;
  const sync = () => document.body.classList.toggle('nav-open', toggle.checked);
  toggle.addEventListener('change', sync);
  sync();
}

// 表の高さ = 地図の高さ（既存）
function adjustMapHeights() {
  document.querySelectorAll('.activity-flex').forEach(sec => {
    const table = sec.querySelector('.activity-table');
    const iframe = sec.querySelector('.map-box iframe');
    if (!table || !iframe) return;
    if (window.innerWidth > 900) {
      iframe.style.height = table.offsetHeight + 'px';
    } else {
      iframe.style.height = '320px';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initFirstTimeToggle();
  initNavScrollLock();
});
window.addEventListener('load', adjustMapHeights);
window.addEventListener('resize', adjustMapHeights);
/* ==== スクロール時に影を強めて“固定ヘッダー感”を出す（任意） ==== */
(function () {
  const hdr = document.querySelector('header');
  if (!hdr) return;
  const onScroll = () => {
    if (window.scrollY > 4) hdr.classList.add('is-scrolled');
    else hdr.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
