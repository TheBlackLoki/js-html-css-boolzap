$(document).ready(function(){
  // variabili per Template in funzioni

  var source = $("#templateMessaggio").html();
  var template = Handlebars.compile(source);
  // var messaggioInvio = $("#invio").val()
  // togliere mic e mettere tasto send all'inserimento di dati nell'imput



  $(".fa-paper-plane").hide();

  $("#invio").keyup(function () {
    if ($("#invio").val() == "") {
      $(".fa-paper-plane").hide();
      $(".fa-microphone").show();
    }else {

    $(".fa-paper-plane").show();
    $(".fa-microphone").hide();
    }
  })


// Utente scrive messaggio nel box e preme sul send o invio-->il messaggio viene stampato a destra in verde e dopo un secondo viene stampata la risposta

  $(".fa-paper-plane").click(invioMsg)
  $('#invio').keypress(function(event) {
    var key = event.which;
    if (key === 13) {
      invioMsg()
    }
  })

// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
  $(".inpRicerca").keyup(function () {
    $(".chatSinistra").show()
    var testoMaiusc = $('.inpRicerca').val()
    // per partire dalla prima
    // var testo = testoMaiusc.charAt(0).toUpperCase() + testoMaiusc.slice(1);
    // per trovare testo ovunque
    var testo = testoMaiusc.toLowerCase();
    console.log(testo);
    $(".nomeContatto").each(function () {
      var questo = $(this).text().toLowerCase()
      var padre = $(this).parent()
      var nonno = padre.parent()
      if (questo.includes(testo)) {
        nonno.parent().show()
      }else {
        nonno.parent().hide()
      }
    })
  })
// Click sul contatto mostra la conversazione del contatto cliccato

  $( ".chatSinistra").click(function() {
    $(".chatSinistra").removeClass("active")
    $(this).addClass("active")
    var nomeAttivo = $(this).find(".nomeContatto").text()
    $('#nomeAttivo').html("<p>" + nomeAttivo + "</p>")
    var immagineAttivo = $(this).find(".immagineUtente").attr("src")
    $(".immagineAttivo").attr("src",immagineAttivo)
    var dataactive = $(this).attr("data-conv")
    $(".chatMsg").removeClass("active")
    $('.chatMsg[data-conv="' + dataactive + '"]').addClass("active");
});


// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato


  $(".chatMsg").on("click", ".fa-angle-down", mostraOpzioni);
  $(".chatMsg").on("click", ".destroy", cancellaMessaggio);



//----------------FUNZIONI-----------//
  function invioMsg() {
    if ($("#invio").val() !== "") {
    var messaggio = $("#invio").val()
    var send = {messaggio:messaggio,tipo:"sent"};
    var htmlSend= template(send);
    $(".chatMsg.active").append(htmlSend);
    $("#invio").val("");
    $(".fa-paper-plane").hide();
    $(".fa-microphone").show();
    setTimeout(risposta, 1000);
  }
  }
  function risposta() {
    var recived = {messaggio:"ok!", tipo:"recived"};
    var htmlRecived= template(recived);
    $(".chatMsg.active").append(htmlRecived)
  }
  function mostraOpzioni() {
    var msgHover = $(this).closest(".msg")
    msgHover.siblings(".msg").find(".panel").removeClass("active")
    msgHover.find(".panel").toggleClass("active")
  }
  function cancellaMessaggio() {
    var messaggio = $(this).closest(".msg")
    messaggio.remove()
  }
})
