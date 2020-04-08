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
  var testo = testoMaiusc.charAt(0).toUpperCase() + testoMaiusc.slice(1);
  // per trovare testo ovunque
  // var testo = testoMaiusc.toLowerCase();
  console.log(testo);
  $(".nomeContatto").each(function () {
    var questo = $(this).text()
    var padre = $(this).parent()
    var nonno = padre.parent()
    if (questo.includes(testo)) {
      console.log(questo);
      nonno.parent().show()
    }else {
      nonno.parent().hide()
    }
  })

})
//----------------FUNZIONI-----------//
  function invioMsg() {
    var messaggio = $("#invio").val()
    $(".chatMsg").append("<div class='msg sent'><p>" + messaggio + "</p></div>");
    $("#invio").val("");
    $(".fa-paper-plane").hide();
    $(".fa-microphone").show();
    setTimeout(risposta, 1000);
  }
  function risposta() {
    $(".chatMsg").append("<div class='msg recived'><p>ok</p></div>")
  }
})
