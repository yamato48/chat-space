$(function(){
  $(".footer-body__button").click(function() {
    var input = $(".footer-body__form").val();

    $.ajax({
      type: 'POST',
      url: '/groups/:group_id/messages',
      data: {: input},
      dataType: 'json'
    })
  });
});
