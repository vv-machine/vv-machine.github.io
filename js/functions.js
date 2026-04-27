$(document).ready(function () {
  var $window = $(window);
  var $body = $('body');
  var $nav = $('.nav');
  var $googleConsent = $('.googleconsent');
  var $hamburger = $('.button--hamburger');
  var $lightboxes = $('.lb');
  var desktopBreakpoint = 960;

  var htmlEl = document.documentElement;
  var $fakeCursor = $('#fakeCursor');

  var lazyLoadState = {
    map: false,
    seam: false
  };

  function clearHash() {
    if (window.location.hash) {
      history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
  }

  function isDesktop() {
    return window.innerWidth >= desktopBreakpoint;
  }

  function closeNav() {
    $googleConsent.removeClass('googleconsent--narrow');
    $nav.removeClass('nav--active nav--hide');
    $hamburger.removeClass('close');
    $body.removeClass('noscroll');
  }

  function closeExpandOverlay() {
    var $expandOverlay = $('#expandOverlay');
    var $expandOverlayImg = $('#expandOverlayImg');
    var $expandOverlayVideo = $('#expandOverlayVideo');
    var $expandOverlayVideoSource = $('#expandOverlayVideo source');

    if (!$expandOverlay.length) {
      return;
    }

    $expandOverlay.removeClass('is-open').attr('aria-hidden', 'true');

    if ($expandOverlayImg.length) {
      $expandOverlayImg.attr('src', '').attr('alt', '').hide();
    }

    if ($expandOverlayVideo.length) {
      $expandOverlayVideo[0].pause();
      if ($expandOverlayVideoSource.length) {
        $expandOverlayVideoSource.attr('src', '');
      }
      $expandOverlayVideo[0].load();
      $expandOverlayVideo.hide();
    }

    $body.removeClass('body--noscroll');
  }

  function closeLightboxes() {
    $lightboxes.removeClass('lb--active lb--hide').css('display', 'none');
    closeExpandOverlay();
    $body.removeClass('body--noscroll');
  }

  function openNav(e) {
    if (e) {
      e.preventDefault();
    }

    if (isDesktop()) {
      return;
    }

    closeLightboxes();
    clearHash();

    $nav.addClass('nav--active');
    $hamburger.addClass('close');
    $body.addClass('noscroll');
  }

  function openLightboxByHash(hash) {
    if (!hash || hash === '#site-nav') {
      return;
    }

    var $target = $(hash);

    if ($target.length && $target.hasClass('lb')) {
      closeNav();
      closeLightboxes();
      $target.addClass('lb--active').css('display', 'block');
      $body.addClass('body--noscroll');
    }
  }

  function triggerLazyLoadersFromHash(hash) {
    if (!hash) {
      return;
    }

    if (hash.indexOf('storymaps') > -1) {
      loadMap();
    }

    if (hash.indexOf('seam') > -1) {
      loadSeam();
    }
  }

  function syncUiToHash() {
    var hash = window.location.hash;

    closeLightboxes();

    if (!hash || hash === '#site-nav') {
      return;
    }

    openLightboxByHash(hash);
    triggerLazyLoadersFromHash(hash);
  }

  function resetResponsiveUi() {
    closeNav();

    if (isDesktop()) {
      $body.removeClass('noscroll body--noscroll');
    }
  }

  function goBack(e) {
    if (e) {
      e.preventDefault();
    }

    closeLightboxes();
    closeNav();
    clearHash();
  }

  function move() {
    $(this).addClass('move');
  }

  function closeNavViaInfoClick() {
    setTimeout(function () {
      closeNav();
    }, 300);
  }

  function loadMap() {
    if (lazyLoadState.map) {
      return;
    }

    var mapEl = document.getElementById('map');

    if (!mapEl) {
      return;
    }

    if (typeof mapboxgl === 'undefined') {
      console.error('Mapbox GL JS is not loaded.');
      return;
    }

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/vv-machine/ckuz38e300g1t14mticq9ttp4?optimize=true',
      center: [134.149831, -28.258874],
      zoom: 2
    });

    map.on('load', function () {
      map.resize();
    });

    lazyLoadState.map = true;
  }

  function loadSeam() {
    var $container = $('#seamLottieContainer');

    if (!$container.length) {
      return;
    }

    if (!$('link[data-font="lato"]').length) {
      $('head').append('<link data-font="lato" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet" />');
    }

    if (!$container.hasClass('seam-lottie-ready')) {
      var jsonPath = window.location.origin + '/img/seam_main.json';

      $container
        .addClass('seam-lottie-ready')
        .html(
          '<lottie-player ' +
            'src="' + jsonPath + '" ' +
            'speed="1" ' +
            'style="width: 100%; height: auto;" ' +
            'loop ' +
            'autoplay>' +
          '</lottie-player>'
        );
    }

    lazyLoadState.seam = true;
  }

  if ($window.width() >= desktopBreakpoint) {
    $('.main__list--left').hover(move);
    $('.main__list--right').hover(move);
  }

  $(document).on('keydown', function (e) {
    if (e.which === 27) {
      if ($('#expandOverlay').hasClass('is-open')) {
        closeExpandOverlay();
      } else {
        goBack();
      }
    }
  });

  $('.lbClose').on('click', function (e) {
    goBack(e);
  });

  $('.nav .button.close').on('click', function (e) {
    e.preventDefault();
    closeNav();
    clearHash();
  });

  $hamburger.on('click', openNav);
  $('.nav__link--info').on('click', closeNavViaInfoClick);

  $('#storymapsLink').on('click', loadMap);
  $('#seamLink').on('click', loadSeam);

  $(window).on('hashchange', function () {
    syncUiToHash();
  });

  $(window).on('resize', function () {
    resetResponsiveUi();
    enableCursorMode();
  });

  resetResponsiveUi();
  syncUiToHash();

  if (!customElements.get('lottie-player')) {
    var sourceLottie = document.createElement('script');
    sourceLottie.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
    sourceLottie.setAttribute('data-lottie-player', 'true');
    document.head.appendChild(sourceLottie);
  }

  var $shopBtn = $('#shopBtn');
  var $shopPopupMobile = $('#shopPopupMobile');
  var $shopPopupClose = $('#shopPopupClose');

  $shopBtn.on('click', function (e) {
    if (window.innerWidth <= 959) {
      e.preventDefault();
      $shopPopupMobile.addClass('is-open').attr('aria-hidden', 'false');
    }
  });

  $shopPopupClose.on('click', function (e) {
    e.preventDefault();
    $shopPopupMobile.removeClass('is-open').attr('aria-hidden', 'true');
  });

  $(document).on('click', function (e) {
    if (window.innerWidth <= 959 && $shopPopupMobile.hasClass('is-open')) {
      if (!$(e.target).closest('#shopPopupMobile, #shopBtn').length) {
        $shopPopupMobile.removeClass('is-open').attr('aria-hidden', 'true');
      }
    }
  });

  $(document).on('click', '.expandable-image, .expandable-media', function (e) {
    if (window.innerWidth < 960) {
      return;
    }

    var $expandOverlay = $('#expandOverlay');
    var $expandOverlayImg = $('#expandOverlayImg');
    var $expandOverlayVideo = $('#expandOverlayVideo');
    var $expandOverlayVideoSource = $('#expandOverlayVideo source');

    if (!$expandOverlay.length) {
      return;
    }

    e.preventDefault();

    var isVideo = $(this).is('video');
    var src = '';
    var alt = $(this).attr('alt') || '';

    if (isVideo) {
      src = $(this).find('source').attr('src') || $(this).attr('src') || '';
    } else {
      src = $(this).attr('src') || $(this).attr('data-src') || '';
    }

    if (!src) {
      return;
    }

    $expandOverlay.addClass('is-open').attr('aria-hidden', 'false');
    $body.addClass('body--noscroll');

    if (isVideo) {
      if ($expandOverlayImg.length) {
        $expandOverlayImg.attr('src', '').attr('alt', '').hide();
      }

      if ($expandOverlayVideo.length) {
        if ($expandOverlayVideoSource.length) {
          $expandOverlayVideoSource.attr('src', src);
        }
        $expandOverlayVideo.show();
        $expandOverlayVideo[0].load();

        var playPromise = $expandOverlayVideo[0].play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {});
        }
      }
    } else {
      if ($expandOverlayVideo.length) {
        $expandOverlayVideo[0].pause();
        if ($expandOverlayVideoSource.length) {
          $expandOverlayVideoSource.attr('src', '');
        }
        $expandOverlayVideo[0].load();
        $expandOverlayVideo.hide();
      }

      if ($expandOverlayImg.length) {
        $expandOverlayImg.attr('src', src).attr('alt', alt).show();
      }
    }
  });

  $(document).on('click', '#expandImageClose', function (e) {
    e.preventDefault();
    closeExpandOverlay();
  });

  $(document).on('click', '#expandOverlay', function (e) {
    if ($(e.target).is('#expandOverlay')) {
      closeExpandOverlay();
    }
  });

  function enableCursorMode() {
    var desktop = window.matchMedia('(min-width: 960px)').matches;

    htmlEl.classList.remove('use-fake-cursor');
    htmlEl.classList.remove('use-css-cursor');

    if (!desktop) {
      $fakeCursor.removeClass('is-gradient');
      return;
    }

    htmlEl.classList.add('use-fake-cursor');
  }

  enableCursorMode();
  $(window).on('load', enableCursorMode);

  $(document).on('mousemove', function (e) {
    if (!htmlEl.classList.contains('use-fake-cursor')) {
      return;
    }

    $fakeCursor.css('transform', 'translate(' + e.clientX + 'px,' + e.clientY + 'px)');
  });

  $(document).on('mouseleave', function () {
    $fakeCursor.css('opacity', '0');
  });

  $(document).on('mouseenter', function () {
    $fakeCursor.css('opacity', '1');
  });

  $(document).on(
    'mouseenter',
    'a, button, .main__link, .nav__link, .lb__button, .button.close, .expandable-image, .expand-image-close',
    function () {
      if (!htmlEl.classList.contains('use-fake-cursor')) {
        return;
      }

      $fakeCursor.addClass('is-gradient');
    }
  );

  $(document).on(
    'mouseleave',
    'a, button, .main__link, .nav__link, .lb__button, .button.close, .expandable-image, .expand-image-close',
    function () {
      $fakeCursor.removeClass('is-gradient');
    }
  );
});