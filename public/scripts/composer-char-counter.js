$(document).ready(function(){
  let num = 140;
  let counterText = $('.charCounter');
  
  

$('#tweet-text').on('keydown', function(){


  counterText.text(num - this.value.length);

  if(Number(counterText.text()) < 0){

    $('.charCounter').addClass('negativeCounter').removeClass('charCounter');
  }else{$('.negativeCounter').addClass('charCounter').removeClass('negativeCounter');}
    
  });
  
})





