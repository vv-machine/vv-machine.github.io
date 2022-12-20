
$(document).ready(function() {


  var overlay = $('.nav'),
      container = $('body');


  // CLOSE LB BUTTON
  function goBack() {
    window.location.hash="";
  }

  $(document).bind('keydown', function(e) {
      if (e.which == 27) {
        goBack();
      }
  });

  $('.lbClose').click(goBack);

  // MAIN LISTS STUFF

  function move() {
    $(this).addClass('move')
  }

  if($(window).width() >= 960) {
    $('.main__list--left').hover(move);

    $('.main__list--right').hover(move);

  }


// HAMBURGER STUFF

  if ($(window).width() < 1200) {
     addHamburger();
  }

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

    function addHamburger(){
      if( !$('.button--hamburger').length )  {
        $(overlay).after('<button class="button button--hamburger"><span></span></button>');
        $(overlay).addClass("nav--hide");
    }


    $('.button--hamburger').click(function(e) {
           e.preventDefault(e);
           toggleActive();
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

  // MAP BOX STUFF

  function loadMap() {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/vv-machine/ckuz38e300g1t14mticq9ttp4?optimize=true', // style URL
      center: [134.149831, -28.258874], // starting position [lng, lat]
      zoom: 2 // starting zoom

    });

    map.resize()
  }


    $('.mapboxgl-canvas').on('idle',function(){
    $('.mapboxgl-canvas').resize()
  })

  //LOADING STUFF

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



    var sourceLottie = document.createElement("script");
    sourceLottie.type = "text/javascript";
    sourceLottie.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    $("head").append(sourceLottie);



});
