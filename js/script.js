$(document).ready(
  function(){

  var textInput = $("#message-text");
  var microphone = $("#microphone");
  var send = $("#send");
  var chat = $(".message-container");

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();

  // Cambio Icona quando focus su area messaggio
  textInput.focus(function() {
    microphone.toggleClass("hidden");
    send.toggleClass("hidden");
  });

  // textInput.focusout(function() {
  //   microphone.toggleClass("hidden");
  //   send.toggleClass("hidden");
  // });

  // Creo Funzione per inviare messaggio al click
  send.click(function() {
    sendMessage();
    textInput.val("");
  });

  // Creo Funzione per inviare messaggio con invio
  textInput.keypress(function(){
    if (event.which == 13) {
      sendMessage();
      textInput.val("");
    }
  });


  function sendMessage(){
    var newMessage = $(".message-container .template").clone();
    var textMessage = newMessage.html("<span class='flex-row'>" + textInput.val() + "<p class='sub hour'>" + time + "</p> </span>");

    newMessage.removeClass("hidden template");

    chat.append(newMessage);
  }


})
