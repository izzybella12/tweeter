$(document).ready(function() {

  $("#toggle-tweet-box").hide();

  $('#clickable-span').on('click', function() {
    $("#toggle-tweet-box").slideToggle("slow");
  });
});