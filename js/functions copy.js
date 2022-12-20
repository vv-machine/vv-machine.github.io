$(document).ready(function() {



  var overlay = $('.nav'),
      container = $('body');

  // HAMBURGER STUFF

  if ($(window).width() < 1200) {
   addHamburger();
  }

  function addHamburger(){
        if( !$('.button--hamburger').length )  {
          $(overlay).after('<button class="button button--hamburger"><span></span></button>');
          $(overlay).addClass("nav--hide");
  }


  var hamburger = document.querySelector(".button--hamburger");
         
         
          // touchstart handler
          hamburger.addEventListener("touchStart", onlyTouch, false);
   
          function onlyTouch(ev) {
              toggleActive();
              ev.preventDefault();
          }
   
          // click event handler
          hamburger.addEventListener("click", onlyClick, false);
   
          function onlyClick(ev) {
            toggleActive();
            ev.preventDefault();

          }



  // MAP

  function loadMap() {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/vv-machine/ckuz38e300g1t14mticq9ttp4?optimize=true', // style URL
      center: [134.149831, -28.258874], // starting position [lng, lat]
      zoom: 2 // starting zoom

    });

    map.resize()
  }

  // CLOSING BUTTON

  function goBack() {
    window.location.hash="";
  }

  $(document).bind('keydown', function(e) {
      if (e.which == 27) {
        goBack();
      }
  });

  $('.lb__button').click(goBack);

  // LIST STUFF

  function move() {
    $(this).addClass('move')
  }

  if($(window).width() >= 960) {
    $('.main__list--left').hover(move);

    $('.main__list--right').hover(move);

  }

  // NAV / INFO STUFF

  var resizeId;

  $(window).resize(function() {
        clearTimeout(resizeId);
        if ($(window).width() < 1200) {
          resizeId = setTimeout(addHamburger, 100);
        }
        else if($('.button--hamburger').length) {
            $('.button--hamburger').remove();
            $(container).removeClass("noscroll");
            $(overlay).removeClass("nav--active");
        }
    });


    $('.nav__link--info').click(function(e) {
      setTimeout(toggleActive,500);

    });


    function toggleActive() {
      $(overlay).toggleClass("nav--active");
      $(container).toggleClass("noscroll");
      $('.button--hamburger').toggleClass("close");
    }

  }


// LOADING STUFF
    function loadLottie() {
      $('#hattifattinerContainer').html('<lottie-player class="lazyload" src="img/seam_hattifattiner.json" speed="1" style="width: 100%; height: auto" loop autoplay class="lazyload"></lottie-player>');
    }

    function loadCodepen() {
      $('#codepenContainer').html('<iframe class="lb__img" height="550" style="width: 105%; margin-left:-2.5%" scrolling="no" title="CSS Flipbook animation with candlelight" src="https://codepen.io/vv-machine/embed/LYzGdmP?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"> See the Pen <a href="https://codepen.io/vv-machine/pen/LYzGdmP">');
    }

    function loadVimeo() {
      $('#gourmetgoonsContainer').html('<iframe src="https://player.vimeo.com/video/104087126?h=117115109f" width="750px" height="400px" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" class="lazyload" allowfullscreen></iframe>');
    }

    $('#storymapsLink').click(loadMap);

    $('#seamLink').click(loadLottie);

    $('#storybookLink').click(loadCodepen);

    $('#gourmetgoonsLink').click(loadVimeo);


    if (window.location.href.indexOf("#storymaps") > -1) {
      loadMap();
    }

    if (window.location.href.indexOf("#seam") > -1) {
      loadLottie();
    }

    if (window.location.href.indexOf("#storybook") > -1) {
      loadCodepen();
    }


      if (window.location.href.indexOf("#gourmetgoons") > -1) {
        loadVimeo();
      }


});
