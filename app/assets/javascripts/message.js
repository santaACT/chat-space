$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message">
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
           <p class="lower-message__coment">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message">
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
          <p class="lower-message__coment">
            ${message.content}
          </p>
         </div>
        </div>`
     return html;
    };
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
});
