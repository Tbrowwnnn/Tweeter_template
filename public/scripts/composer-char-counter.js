$(document).ready(function(){
  let num = 140;
  let counterText = $('.charCounter');
  
  
const charCount = function(){
  counterText.text
}

$('#tweet-text').on('keydown', function(){

  $('.errorMessageTooMany').slideUp(500);

  setTimeout(() => {
    counterText.text(num - this.value.length)
    
  }, 10);

  if(Number(counterText.text()) < 0){

    $('.charCounter').addClass('negativeCounter').removeClass('charCounter');
  }else{$('.negativeCounter').addClass('charCounter').removeClass('negativeCounter');}
    
  });

})





