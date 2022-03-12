$(document).ready(function() {
  var overlay = $('.nav'),
      container = $('body');

  if ($(window).width() < 1200) {
   addHamburger();
  }

  $('.lb__button').click(function(e) {
    e.preventDefault();
    window.location.hash="";
  });

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

});
