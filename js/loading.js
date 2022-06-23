$(window).on('load', function () {

  $("#loader").fadeOut(100);
});

var seconds = -1;
var el = document.getElementById('counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = seconds;

  if ( seconds == 5 ) {
    console.log('5');
  }
}

var cancel = setInterval(incrementSeconds, 1000);
