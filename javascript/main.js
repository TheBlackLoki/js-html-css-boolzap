// togliere mic e mettere tasto send all'inserimento di dati nell'imput


$(document).ready(function(){

  $(".fa-paper-plane").hide();
  $("#invio").keypress(function () {
    $(".fa-paper-plane").show();
    $(".fa-microphone").hide();
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
    document.getElementById('nomeAttivo').innerHTML="<p>" + nomeAttivo + "</p>"
    var dataactive = $(this).attr("data-conv")
    $(".chatMsg").removeClass("active")
    $('.chatMsg[data-conv="' + dataactive + '"]').addClass("active");
});


// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato


  $(".chatMsg").on("click", ".fa-angle-down", mostraOpzioni);
  $(".chatMsg").on("click", ".destroy", cancellaMessaggio);



//----------------FUNZIONI-----------//
  function invioMsg() {
    var messaggio = $("#invio").val()
    $(".chatMsg.active").append("<div class='msg sent'><p>" + messaggio + "</p><i class='fas fa-angle-down'></i><div class='panel'><div class='destroy'>Cancella il Messaggio</div></div</div>");
    $("#invio").val("");
    $(".fa-paper-plane").hide();
    $(".fa-microphone").show();
    setTimeout(risposta, 1000);
  }
  function risposta() {
    $(".chatMsg.active").append("<div class='msg recived'><p>ok</p><i class='fas fa-angle-down'></i><div class='panel'><div class='destroy'>Cancella il Messaggio</div></div></div>")
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
