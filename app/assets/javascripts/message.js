$(function(){
  function buildHTML(message){
    var image = (message.image == null) ? `` : `<image class="lower-message__image" src=${message.image}>`;
    var html = `<div class ="message" id ="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__name">${message.name}</p>
                    <p class="upper-message__time">${message.time}</p>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__body">${message.content}</p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
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
      $('.footer-body__button').prop('disabled', false)
      $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('error')
      $('.footer-body__button').prop('disabled', false)
    })
  });

  function autoReload(){
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message').last().attr('id');
      $.ajax({
        url: url,
        type: 'GET',
        data: {id: message_id},
        dataType: 'json'
      })
      .done(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.message-list').append(html);
          $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight});
          });
        }
      })
      .fail(function(){
        alert('更新できませんでした')
      })
    };
  };
  setInterval(autoReload, 2000)
});
