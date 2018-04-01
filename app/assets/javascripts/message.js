$(function(){
  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action')
    console.log(formdata)

    $.ajax({
      type: 'POST',
      url: url,
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })

  });
});
