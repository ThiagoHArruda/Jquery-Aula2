$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").show()
    $.get('http://localhost:3000/frases', trocaFrase)
        .fail(() => {
            $("#erro").toggle();
            setTimeout(function() {
                $("#erro").toggle();
            }, 1500);
        })
        .always(() => [
            $("#spinner").hide()
        ]);
}

function trocaFrase(data) {
    let aleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[aleatorio].texto)

    atualizaTamanhoFrase();
    trocaTempo(data[aleatorio].tempo);

}

function buscaFrase() {

    $("#spinner").show()

    let fraseID = $('#frase-id').val();
    let dados = { id: fraseID }
    $.get('http://localhost:3000/frases', dados, selecionaFrase)
        .fail(() => {
            $("#erro").toggle();
            setTimeout(function() {
                $("#erro").toggle();
            }, 1500);
        })
}

function selecionaFrase(data) {
    $("#spinner").hide();
    console.log(data.texto);
    $('.frase').text(data.texto);

    atualizaTamanhoFrase();
    trocaTempo(data.tempo)

}