$(document).ready(function() {
  //var source = document.createElement("script");
  // button element

          $("#googleYes").on("click touchend", function() {
            var source = document.createElement("script");
            source.type = "text/javascript";
            source.src = "https://www.googletagmanager.com/gtag/js?id=G-QJP6QQEXFE";
            $("head").append(source);
            localStorage.ClassName = "lb--close";

            $("#googleConsent").addClass('lb--close');
            return false;
          });

          $("#googleNo").on("click touchend", function() {
            $("#googleConsent").addClass('lb--close');
            localStorage.ClassName = "lb--close";
            return false;
          });


    SetClass();
});

function SetClass() {
    $("#googleConsent").addClass(localStorage.ClassName);
}
