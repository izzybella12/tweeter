/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#error").hide();

  const createTweetElement = function(tweetData) {

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let problematicText = tweetData.content.text;

    // let dateCreated = timeago(tweetData.created_at);
    // let firstDay = new Date(dateCreated);
    // let day1 = String(firstDay.getDate()).padStart(2, '0');
    // let today = Date.now();
    // let secondDay = new Date(today);
    // let day2 = String(secondDay.getDate()).padStart(2, '0');
    // let daysSince = day2 - day1;

    const $tweet = $(`
      <article class="posted-tweet">
        <header class="name-username">
          <img src="${tweetData.user.avatars}"></img>
          <span class="tweeter-name">${tweetData.user.name}</span>
          <span class="tweeter-username">${tweetData.user.handle}</span>
        </header>
        <span class="tweet-content">${escape(problematicText)}</span>
          <footer class="date-icon">
        <span class="date">${timeago.format(tweetData.created_at)}</span>
        <i class="material-icons">outlined_flag reply favorite_border</i>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const renderTweets = function(arrayOfTweets) {
    for (let tweet of arrayOfTweets) {
      const $singleTweet = createTweetElement(tweet);
      $('#tweet-container').append($singleTweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function(response) {
        renderTweets(response);
      });
  };

  loadTweets();

  const loadOneTweet = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function (response) {
        let lastTweet = response.pop();
        const $singleTweet = createTweetElement(lastTweet);
        $('#tweet-container').append($singleTweet);
      });
  };

  const slideBackUp = function() {
    setTimeout(function() {
      $("#error").slideUp("slow");
    }, 5000);
  };

  $('form').on('submit', function(event) {
    $("#error").slideUp("slow");
    event.preventDefault();
    let tweetContent = $('#tweet-text').val();
    if (tweetContent.length > 140) {
      $("#error").text("Stop right there. No more than 140 characters. Back it up.");
      $("#error").slideDown("slow");
      slideBackUp();
    } else if (tweetContent === "" || tweetContent === null) {
      $("#error").text("Your tweet must contain AT LEAST 1 character... come on");
      $("#error").slideDown("slow");
      slideBackUp();
      
    } else {
      $('#word-count').text(140)
      let data = $(this).serialize();
      $("#error").hide();
      $.ajax('/tweets', { method: 'POST', data})
        .then(function(response) {
          console.log('Success: ', response);
          $('#tweet-text').val("");
          loadOneTweet();
        });
    }
  });

});