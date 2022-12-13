$(document).ready(function() {

  //hides error message on load
  $('.errorMessageTooMany').hide();

  //renders new tweeted by user and sent back to the server and prepend to page
  //tweets are also emptied on render to prevent duplicates
  const renderTweets = function(tweets) {
    $('.tweet-container').empty();

    for (const tweeting of tweets) {
      const element = createTweetElement(tweeting);

      $('.tweet-container').prepend(element);
    }
  };

  //turns potential code typed in by user into plain string.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // This creates template for new tweets
  const createTweetElement = function(tweetData) {

    const username = tweetData.user.name;
    const profilePic = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const status = escape(tweetData.content.text);
    const ago = timeago.format(tweetData.created_at);

    //template HTML that will get appended to index.html
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

  //responsible for loading tweets using a get request to get from /tweets
  const loadTweets = function() {
    $.get('/tweets')
      .then((tweets) => {
        renderTweets(tweets);
      });
  };
  //tweets loaded on initilization
  loadTweets();

  //decides what to do when tweet button is clicked
  $('#tweet-form').on('submit', function(event) {

    event.preventDefault();
    const data = $(this).serialize();//takes body of tweet and serialize
    const obj = Object.fromEntries(new URLSearchParams(data)); //converts serialized to plain string

    //if text length is over char limit then throw error message
    if (obj.text.length > 140) {

      $('.errorMessageTooMany').text('Not a valid tweet! - please keep your tweet within 140 characters');
      $('.errorMessageTooMany').slideDown(1000);

      //if form is blank throw error message
    } else if (obj.text === '' || obj.text === null) {

      $('.errorMessageTooMany').text('Not a valid tweet! - tweet cannot be empty.');
      $('.errorMessageTooMany').slideDown(1000);
    }
    else {  //if checks pass then send tweet to /tweets
      $.post('/tweets', data, (respond) => {
        
        loadTweets();
        $('#tweet-form')[0].reset();

      }).fail(function(){
        $('.errorMessageTooMany').text('Error from server');
        $('.errorMessageTooMany').slideDown(1000);
      });
    }
  });
});
