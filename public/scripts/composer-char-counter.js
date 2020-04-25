$(document).ready(function() {

  $('#tweet-text').on('keyup', function() {
    const content = $(this).val();
    let currentCount = (140 - content.length);
    $('#word-count').text(currentCount); //The text is currentCount
    if (currentCount < 0) {
      $('#word-count').text(currentCount).css("color", "#B22222");
    } else if (currentCount >= 0) {
      $('#word-count').text(currentCount).css("color", "#545149");
    }
  });
  
});