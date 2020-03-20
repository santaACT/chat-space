$(function(){
  function buildHTML(message){
      var content = message.content ? `<p class="lower-message__coment">${message.content}</p>` : "";
      var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";
      
      var html =
       `<div class="message" data-message-id =  ${message.id}>
         <div class="message-text">
           <div class="message-text__info">
             <div class="message-text__info__name">
               ${message.user_name}
             </div>
             <div class="message-text__info__time">
               ${message.created_at}
             </div>
           </div>
         </div>
         <div class="lower-message">
           ${content}
           ${image}
         </div>
        </div>`
      return html;
    } 

  $('#new_message').on('submit', function(e){
  

    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.message-list').append(html);   
       $('form')[0].reset();
       $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
       $('.message-input__submit').attr('disabled', false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
　})
var reloadMessages = function() {
  var last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.message-list').append(insertHTML);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('reloadMessageError');
  });
 };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
