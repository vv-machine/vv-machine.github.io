$(window).on('load', function () {
    $("#loader").fadeOut(200);
    $("#main-wrapper").addClass("loaded");
});

var seconds = -1;
var el = document.getElementById('counter');

function incrementSeconds() {
    seconds += 1;
    document.getElementById('counter').innerText = seconds ;

  if ( seconds == 5 ) {
    console.log('5');
  }
}

var cancel = setInterval(incrementSeconds, 1000);
