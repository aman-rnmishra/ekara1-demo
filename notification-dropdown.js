(function () {
  function initNotificationDropdowns() {
    document.querySelectorAll('.notification-dropdown').forEach(function (wrap) {
      var btn = wrap.querySelector('.notification-bell');
      if (!btn || btn.tagName !== 'BUTTON') return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = wrap.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.notification-dropdown.open').forEach(function (wrap) {
        wrap.classList.remove('open');
        var btn = wrap.querySelector('.notification-bell');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.querySelectorAll('.notification-dropdown').forEach(function (wrap) {
      wrap.addEventListener('click', function (e) { e.stopPropagation(); });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotificationDropdowns);
  } else {
    initNotificationDropdowns();
  }
})();
