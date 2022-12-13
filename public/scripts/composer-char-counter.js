$(document).ready(function() {
  let num = 140;
  let counterText = $('.charCounter');

  //sets char count to subtract from char limit 
  $('#tweet-text').on('input', function() {

    $('.errorMessageTooMany').slideUp(500); //slides up error message if present

    counterText.text(num - this.value.length);


    //if counter is below 0 then class is changed to accomodate red color
    if (Number(counterText.text()) < 0) {

      $('.charCounter').addClass('negativeCounter').removeClass('charCounter');
    } else { $('.negativeCounter').addClass('charCounter').removeClass('negativeCounter'); }
  });

  $('#tweet-form').on('submit', function(event) {
    counterText.text(num);
  });
})





