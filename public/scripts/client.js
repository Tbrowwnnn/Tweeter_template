/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {


  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Darth Vader",
  //       "avatars": "/images/clipart314371.png"
  //       ,
  //       "handle": "@iamyourfather"
  //     },
  //     "content": {
  //       "text": "You underestimate the power of the dark side."
  //     },
  //     "created_at": "just now"
  //   },
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function(tweets) {
    $('.tweet-container').empty();

    for (const tweeting of tweets) {
      const element = createTweetElement(tweeting);

      $('.tweet-container').prepend(element);
    }
  };

  const escape = function (str){
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  const createTweetElement = function(tweetData) {

    let username = tweetData.user.name;
    let profilePic = tweetData.user.avatars;
    let handle = tweetData.user.handle;
    let status = `<p>${escape(tweetData.content.text)}</p>`;
    const ago = timeago.format(tweetData.created_at);

    const output = `<article class="tweeted">
    <header><div class='personName'><img src=${profilePic}><div class="justName">${username}</div></div>
      <div class="handle">
        ${handle}
      </div>
    </header>
    <br>
    <div class="name">
      ${status}
    </div>
    <footer><div class="time">
    <time class="timeago">${ago}</time>
      </div>
      <div class="icons">
      <i class="fa-brands fa-font-awesome"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-brands fa-galactic-republic"></i>
      </div>
    </footer>
  </article>
  <br>`;

    return output;
  };


  // const $tweet = $(`<article class="tweet">Hello world</article>`);



  // Test / driver code (temporary)
  // to see what it looks like
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // renderTweets(tweetData)



  const loadTweets = function() {
    $.get('/tweets')
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  loadTweets();

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const obj = Object.fromEntries(new URLSearchParams(data));
    console.log(obj.text.length);

   if(obj.text === '' || obj.text.length > 140 || obj.text === null){
    $('.tweetanderror').append(`<div class ="errorMessage">Not a valid tweet</div>`);
   }else{
      $.post('/tweets', data, (respond) => {
        
        loadTweets();
        $('#tweet-form')[0].reset();
      });
    }
  });



});
