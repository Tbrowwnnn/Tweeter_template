$(document).ready(function(){
  let num = 140;
  let counterText = $('.charCounter');
  counterText.text(num);
  
  

$('#tweet-text').on('keydown', function(){

  $('.errorMessage').remove();

  counterText.text(num - this.value.length);

  if(Number(counterText.text()) < 0){

    $('.charCounter').addClass('negativeCounter').removeClass('charCounter');
  }else{$('.negativeCounter').addClass('charCounter').removeClass('negativeCounter');}
    
  });
  
})





