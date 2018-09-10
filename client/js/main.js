$(document).ready(function() {
  $('#cart').click(function() {
    $('.modal-container').animate({
      opacity: 1
    }, 500);
    $('.modal-container').show();
  });

  $('.close').click(function() {
    $('.modal-container').hide();
    $('.modal-container').css({
      opacity: 0.7
    });
  });
});