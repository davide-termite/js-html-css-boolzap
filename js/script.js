$(document).ready(
  function(){

  var textInput = $("#message-text");
  var microphone = $("#microphone");
  var send = $("#send");
  var chat = $(".message-container");


  // Riprendo orario
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var time = addZero(hours) + ":" + addZero(minutes);

  /////// MILESTONE 1 ///////

  // Cambio Icona quando focus su area messaggio
  textInput.focus(function() {
    microphone.toggleClass("hidden");
    send.toggleClass("hidden");
  });

  // Cambio Icona quando focus non più su area messaggio
  textInput.blur(function() {
    microphone.toggleClass("hidden");
    send.toggleClass("hidden");
  });


  // Inviare messaggio al click
  send.click(function() {
    sendMessage();
    textInput.val("");
  });

  // Inviare messaggio con invio
  textInput.keypress(function(){
    if (event.which == 13 || event.keycode == 13) {
      sendMessage();
      textInput.val("");
    }
  });

  // Funzione per inviare messaggio se Input non è vuoto
  function sendMessage(){
    if (textInput.val() != "") {
      var newMessage = $(".template-user").clone();
      var textMessage = newMessage.children(".text-message");
      var textTime = newMessage.children(".hour");

      textMessage.text(textInput.val());
      textTime.text(time);

      newMessage.removeClass("hidden template-user");

      $(".visible").append(newMessage);

      setTimeout(sendReply, 1000);
    }
  }

  // Funzione per ricevere messaggio preimpostato
  function sendReply(){
    var newMessage = $(".template-reply").clone();
    var textMessage = newMessage.children(".text-message");
    var textTime = newMessage.children(".hour");

    textMessage.text("ok");
    textTime.text(time);

    newMessage.removeClass("hidden template-reply");

    $(".visible").append(newMessage);
  }

  // Funzione che aggiunge 0 a minuti e ore <10
  function addZero(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  /////// MILESTONE 2 ///////

  // Funzione per cercare nomi nella sezione contatti

  var searchQuery = $(".searchbar .search input");
  var contactName = $(".card-contact .text .name");

  searchQuery.keyup(function() {
    contactName.each(function() {
      if ($(this).text().includes(searchQuery.val())) {
        $(this).parents(".card-contact").show();
      }
      else {
        $(this).parents(".card-contact").hide();
      }
    });
  });


  /////// MILESTONE 3 ///////
  var contactCard = $('.card-contact');

  // Dropdown menù al click sulla freccia
  $(document).on('click','.arrow', function(){
    $(this).parent().siblings().find(".dropdown").addClass("hidden");

    $(this).siblings(".dropdown").toggleClass("hidden");
  });

  // Cancello messaggio dal dropdown menù
  $(document).on('click','.delete', function() {
    $(this).parents(".box").remove();
  })

  // Seleziono contatto  e relativa chat
  contactCard.on('click', function (){

    // Aggiungo classe active nella chat che si utlizza
    $(this).siblings().removeClass('active-chat');
    $(this).addClass('active-chat');

    // Riprendo nome contatto e avatar
    var avatar = $(this).find('.avatar').html();
    var avatarName = $(this).find('.text .name').html();

    // Riprendo attributo del contatto e chat
    var attrContact = $(this).attr('data-contact');
    var attrChat = '.chat .message-container[data-chat="' + attrContact + '"]'

    // Nascondo chat non in utilizzo
    $(attrChat).siblings(".message-container").addClass("hidden");
    $(attrChat).siblings(".message-container").removeClass("visible");

    // Rendo visibile chat in utilizzo
    $(attrChat).removeClass("hidden");
    $(attrChat).addClass("visible");

    // Aggiungo nome e avatar a chat attiva
    $('.chat-wrap .navbar .avatar').html(avatar);
    $('.chat-wrap .text .name').html(avatarName);

  })

}) // End Doc Ready
