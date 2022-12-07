/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){
  

  const tweetData = [
    {
      "user": {
        "name": "Darth Vader",
        "avatars": "/images/clipart314371.png"
        ,
        "handle": "@iamyourfather"
      },
      "content": {
        "text": "You underestimate the power of the dark side."
      },
      "created_at": "just now"
    },
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets){



    for(tweeting of tweets){
      $('.tweet-container').append(createTweetElement(tweeting))
    }
  }

 

  const createTweetElement = function(objectInfo) {

    let username = objectInfo.user.name;
    let profilePic = objectInfo.user.avatars;
    let handle = objectInfo.user.handle;
    let status = objectInfo.content.text;
    let timeCreated = objectInfo.created_at;

    

   const output =`<article class="tweeted">
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
    <time class="timeago">${(new Date())}</time>
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
  renderTweets(tweetData)

  const $form = $('#tweet-form');

 $form.on('submit', (event) => {
  event.preventDefault();

  const data = $form.serialize();

  

  $.post(data, (respond) => {
    console.log(data)
  })


})

const loadTweets = function(){
  $.get('/styles/new-tweet.css', (tweets) => {
    console.log(tweets);
    renderTweets(tweets);
  })
}
loadTweets();


});
