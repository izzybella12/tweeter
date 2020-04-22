$(document).ready(function() {
  console.log("Ready!");

  // let element = document.getElementById('tweet-text');

  // element.addEventListener('keypress', function(event) {
  //   let wordcount = 0;
  //   if (this) {
  //     wordcount++;
  //   }
  // });

  $('#tweet-text').on('keyup', function(event) {
    console.log($(this).val());
    const content = $(this).val();
    let currentCount = (140-content.length)
    $('#word-count').text(currentCount); //The text is currentCount
    if (currentCount < 0) {
      $('#word-count').text(currentCount).css("color", "#B22222");
    } else if (currentCount >= 0) {
      $('#word-count').text(currentCount).css("color", "#545149");
    }
  })

});