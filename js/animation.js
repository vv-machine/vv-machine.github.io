$(document).ready(function() {


  $(window).on('scroll', function() {

      $('.main__item').each(function(index, element) {
              elementTop = $(element).offset().top - $(window).scrollTop();
              elementBottom =  $(element).offset().top + $(element).outerHeight(true);
              $next = $(element).next();
              $prev = $(element).prev();

              if (up == false && elementTop >= gridTop && $prev.hasClass("open") ) {
                setTimeout(function(){
                   $(element).addClass('open');
                //   console.log(index + 'it added class');
                }, 10);
              }
              else if  (up == true && $prev.hasClass("open") && !($next.hasClass("open")) ) {

                    console.log(index + 'activated');
                    setTimeout(function(){
                   $(element).removeClass('open');
                //   console.log(index + 'it added class');
              }, 10 );
              }

      });

  }); /*SET TIME SCROLLL OUT END*/


}); /*ONSCROLL END */
