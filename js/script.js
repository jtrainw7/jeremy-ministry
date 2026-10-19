(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  // Reading progress + nav state
  var bar = document.getElementById('progressBar'), nav = document.getElementById('nav');
  function onScroll() {
    var h = root.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    nav.classList.toggle('nav--solid', scrollY > innerHeight * 0.6);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // Count-up for FCA stats (final numbers are already in the HTML)
  var counters = document.querySelectorAll('[data-count]');
  if (!reduce && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (!x.isIntersecting) return;
        co.unobserve(x.target);
        var el = x.target, end = +el.getAttribute('data-count'), t0 = null, dur = 1600;
        function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // Lightbox
  var lb = document.getElementById('lb'), lbImg = lb.querySelector('img'), last;
  function open(btn) {
    last = btn; var im = btn.querySelector('img');
    lbImg.src = btn.getAttribute('data-full'); lbImg.alt = im ? im.alt : '';
    lb.hidden = false; document.body.style.overflow = 'hidden';
    lb.querySelector('.lb__close').focus();
  }
  function close() { lb.hidden = true; lbImg.removeAttribute('src'); document.body.style.overflow = ''; if (last) last.focus(); }
  document.querySelectorAll('.zoom').forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
  lb.addEventListener('click', close);
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });

  // Share
  var sb = document.getElementById('shareBtn');
  if (sb) sb.addEventListener('click', function () {
    var data = { title: 'The Mission Continues | Ministry Impact Report', url: location.href };
    if (navigator.share) { navigator.share(data).catch(function () {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(function () { sb.textContent = 'Link copied ✓'; }); }
  });
})();
