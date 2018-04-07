$(function() {
  var search_list = $("#user-search-result");

  //ユーザーリスト
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  //ユーザーがいない
  function appendNoUser(alert) {
    var html =`<div class='chat-group-user clearfix'>
                <p class='chat-group-user__name'>${alert}</p>
               </div>`
    search_list.append(html);
  }

  //キー入力イベント
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#chat-group-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーは見つかりません")
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });

  //チャットメンバー追加処理
  function pushAddButton(id, name) {
    html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>`
    $("#chat-group-users").append(html)
  }

  //追加ボタン押下
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(user) {
    var user_id = $(this).attr("data-user-id")
    var user_name = $(this).attr("data-user-name")
    pushAddButton(user_id, user_name)
  })

  //削除ボタン
  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  })
});
