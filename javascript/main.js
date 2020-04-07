// togliere mic e mettere tasto send all'inserimento di dati nell'imput


$(document).ready(function(){

$(".fa-paper-plane").hide()
$("#invio").keypress(function () {
  $(".fa-paper-plane").show()
  $(".fa-microphone").hide()
})

// Utente scrive messaggio nel box e preme sul send-->il messaggio viene stampato a destra in verde

$(".fa-paper-plane").click(function () {
  var messaggio = $("#invio").val()

$(".chatMsg").append("<div class='msg sent'><p>" + messaggio + "</p></div>");

  $("#invio").val("");
  $(".fa-paper-plane").hide()
  $(".fa-microphone").show()
})
})
