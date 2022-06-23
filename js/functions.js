$(window).on('load', function () {
    $("#loader").fadeOut(200);
    $("#main-wrapper").addClass("loaded");

});

var seconds = -1;
var el = document.getElementById('counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = seconds ;

  if ( seconds == 5 ) {
    console.log('5');
  }
}

var cancel = setInterval(incrementSeconds, 1000);


$(document).ready(function() {



  var overlay = $('.nav'),
      container = $('body');

  if ($(window).width() < 1200) {
   addHamburger();
  }

  function loadMap() {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/vv-machine/ckuz38e300g1t14mticq9ttp4?optimize=true', // style URL
      center: [134.149831, -28.258874], // starting position [lng, lat]
      zoom: 2 // starting zoom

    });

    map.resize()
  }

  function goBack() {
    window.location.hash="";
  }

  $(document).bind('keydown', function(e) {
      if (e.which == 27) {
        goBack();
      }
  });

  $('.lb__button').click(goBack);

  function move() {
    $(this).addClass('move')
  }
  $('.main__list--left').hover(move);

  $('.main__list--right').hover(move);

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

    $('.mapboxgl-canvas').on('idle',function(){
    $('.mapboxgl-canvas').resize()
  })


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
