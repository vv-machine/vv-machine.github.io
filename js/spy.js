$(document).ready(function() {
  // button element

          $("#googleYes").on("click touchend", function() {
            var source = document.createElement("script");
            source.type = "text/javascript";
            source.src = "https://www.googletagmanager.com/gtag/js?id=G-QJP6QQEXFE";
            $("head").append(source);
            localStorage.ClassName = "googleconsent--close";

            $("#googleConsent").addClass('googleconsent--close');
            return false;
          });

          $("#googleNo").on("click touchend", function() {
            $("#googleConsent").addClass('googleconsent--close');
            localStorage.ClassName = "googleconsent--close";
            return false;
          });


    SetClass();
});

function SetClass() {
    $("#googleConsent").addClass(localStorage.ClassName);
}
