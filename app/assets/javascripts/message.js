$(function(){
  moment.locale('ja');

  function buildHTML(message){
    var date = moment(message.time).format("YYYY/MM/DD HH:mm:ss");
    var image = (message.image == null) ? `` : `<image class="lower-message__image" src=${message.image}>`;
    var html = `<div class="upper-message">
                  <p class="upper-message__name">${message.name}</p>
                  <p class="upper-message__time">${date}</p>
                </div>
                <div class="lower-message">
                  <p class="lower-message__body">${message.content}</p>
                  ${image}
                </div>`
    return html;
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      type: 'POST',
      url: url,
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html)
      $('.footer-body__text').val('')
      $('.hidden').val('')
      $('.footer-body__button').prop("disabled", false)
      $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('error')
      $('.footer-body__button').prop("disabled", false)
    })
  });
});
