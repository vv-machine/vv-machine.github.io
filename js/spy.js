$(document).ready(function() {

  // button element
          var button = document.querySelector("#googleYes");
          var button2 = document.querySelector("#googleNo");         
       
          // touchstart handler
          button.addEventListener("touchStart", onlyTouch, false);
   
          function onlyTouch(ev) {
             
              var source = document.createElement("script");
              source.type = "text/javascript";
              source.src = "https://www.googletagmanager.com/gtag/js?id=G-QJP6QQEXFE";
              $("head").append(source);

              $("#googleConsent").addClass('lb--close')
              ev.preventDefault();
          }
   
          // click event handler
          button.addEventListener("click", onlyClick, false);
   
          function onlyClick(ev) {
   
              var source = document.createElement("script");
              source.type = "text/javascript";
              source.src = "https://www.googletagmanager.com/gtag/js?id=G-QJP6QQEXFE";
              $("head").append(source);

              $("#googleConsent").addClass('lb--close')
              ev.preventDefault();

         }

  // touchstart handler
          button2.addEventListener("touchStart", onlyTouch, false);
   
          function onlyTouch(ev) {
              $("#googleConsent").addClass('lb--close');
                  localStorage.ClassName = "lb--close";
              ev.preventDefault();
          }
   
          button2.addEventListener("click", onlyClick, false);   
          function onlyClick(ev) {
              $("#googleConsent").addClass('lb--close');
                  localStorage.ClassName = "lb--close";
              ev.preventDefault();
          }
    SetClass();
});

function SetClass() {
//before assigning class check local storage if it has any value
    $("#googleConsent").addClass(localStorage.ClassName);
}
