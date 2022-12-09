$(document).ready(function() {
  let num = 140;
  let counterText = $('.charCounter');

  //sets char count to subtract from char limit 
  $('#tweet-text').on('keydown', function() {

    $('.errorMessageTooMany').slideUp(500); //slides up error message if present

    setTimeout(() => {
      counterText.text(num - this.value.length);
    }, 10);

    //if counter is below 0 then class is changed to accomodate red color
    if (Number(counterText.text()) < 0) {

      $('.charCounter').addClass('negativeCounter').removeClass('charCounter');
    } else { $('.negativeCounter').addClass('charCounter').removeClass('negativeCounter'); }
  });
})





