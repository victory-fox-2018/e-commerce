function showModal(modalId) {
  $('.modal-container').animate({
    opacity: 1
  }, 500);
  $(`${modalId}`).show();
}

function closeModal(modalId) {
  $(`${modalId}`).hide();
  $('.modal-container').css({
    opacity: 0.7
  });
}

function showSnackbar() {
  let x = $('#snackbar');
  x.addClass('show');

  setTimeout(function(){ x.removeClass('show') }, 2000);
}

$(document).ready(function() {
  $('#cart').click(function() {
    showModal('#cart-modal');
  });
  $('#cart-close').click(function() {
    closeModal('#cart-modal');
  });

  $('#signin-btn').click(function() {
    showModal('#signin-modal');
  });
  $('#signin-close').click(function() {
    closeModal('#signin-modal');
  });

  $('#signup-btn').click(function() {
    showModal('#signup-modal');
  });
  $('#signup-close').click(function() {
    closeModal('#signup-modal');
  });
});