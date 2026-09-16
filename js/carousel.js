document.addEventListener('DOMContentLoaded', function () {
  var carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('.gallery-carousel__track');
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = carousel.querySelector('.gallery-carousel__dots');
    var prevBtn = carousel.querySelector('.gallery-carousel__arrow--prev');
    var nextBtn = carousel.querySelector('.gallery-carousel__arrow--next');

    var index = 0;
    var isFixed = carousel.classList.contains('gallery-carousel--fixed');

    /* Create dots */
    slides.forEach(function (_, i) {
      var dot = document.createElement('div');

      dot.className =
        'gallery-carousel__dot' +
        (i === 0 ? ' gallery-carousel__dot--active' : '');

      dot.addEventListener('click', function () {
        goTo(i);
      });

      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.children);

    /*
     * Normal carousel:
     * height follows the image ratio.
     *
     * Fixed carousel:
     * height is controlled by CSS.
     */
    function applyHeight(media) {
      if (isFixed) return;

      var ratio =
        media.tagName === 'IMG'
          ? media.naturalHeight / media.naturalWidth
          : media.videoHeight / media.videoWidth;

      if (!ratio) return;

      track.style.height = carousel.clientWidth * ratio + 'px';
    }

    function setHeightToSlide(i) {
      if (isFixed) return;

      var media = slides[i].querySelector('img, video');
      if (!media) return;

      if (media.tagName === 'IMG') {
        if (media.complete && media.naturalWidth !== 0) {
          applyHeight(media);
        } else {
          media.addEventListener(
            'load',
            function onLoad() {
              applyHeight(media);
              media.removeEventListener('load', onLoad);
            }
          );
        }
      } else {
        if (media.readyState >= 1) {
          applyHeight(media);
        } else {
          media.addEventListener(
            'loadedmetadata',
            function onMeta() {
              applyHeight(media);
              media.removeEventListener('loadedmetadata', onMeta);
            }
          );
        }
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;

      /* ALWAYS move horizontally */
      track.style.transform =
        'translateX(-' + index * 100 + '%)';

      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle(
          'gallery-carousel__dot--active',
          dotIndex === index
        );
      });

      setHeightToSlide(index);
    }

    /* Arrows */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(index + 1);
      });
    }

    /* Resize */
    window.addEventListener('resize', function () {
      setHeightToSlide(index);
    });

    /*
     * Swipe
     * Both carousel types move horizontally.
     */
    var startX = null;
    var startY = null;

    carousel.addEventListener(
      'touchstart',
      function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    carousel.addEventListener(
      'touchend',
      function (e) {
        if (startX === null || startY === null) return;

        var diffX = e.changedTouches[0].clientX - startX;
        var diffY = e.changedTouches[0].clientY - startY;

        if (
          Math.abs(diffX) > 40 &&
          Math.abs(diffX) > Math.abs(diffY)
        ) {
          goTo(diffX < 0 ? index + 1 : index - 1);
        }

        startX = null;
        startY = null;
      }
    );

    /* Initial state */
    setHeightToSlide(0);
  });
});