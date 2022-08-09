$("#botao-placar").click(mostrarPlacar)
$("#botao-sync").click(sincronizaPlacar)

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").text()
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    //mostra o placar
    $(".placar").slideDown(400);
    scrollPlacar()
}

function scrollPlacar() {
    let posicaoPlacar = $(".placar").offset().top
    $("html, body").animate({
        scrollTop: posicaoPlacar
    }, 500)
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    let linha = $(this).parent().parent()
    linha.fadeOut(600); //fade (esmaecer) até dar display: none com o tempo em ms
    //fadeIn(), fadeToggle()
    setTimeout(() => { // para a funcao por um periodo de tempo
        linha.remove(); //só remove -- 
    }, 600)
}

function mostrarPlacar() {
    $(".placar").stop().slideToggle(600);
    //stop() -- para a animação antes de iniciar outra
    //slideToggle('tempo') -- Varia entre esconder e mostrar com animação do tempo em ms
    //slideUp('tempo') -- Esconde com animação do tempo em ms
    //slideDown('tempo'); -- Mostra com animação do tempo em ms
    //toggle();-- Varia entre esconder e mostrar slide
    //show(); -- Mostra o slide
    //hide(); --Esconde o Slide

}

function sincronizaPlacar() {
    let placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function() {
        let user = $(this).find("td:nth-child(1)").text()
        let palavras = $(this).find("td:nth-child(2)").text()
        var score = {
            usuario: user,
            pontos: palavras
        };
        placar.push(score);

        let dados = { placar: placar }

        $.post("http://localhost:3000/placar", dados, function() {
                console.log("salvou os dados");
                $('.tooltip').tooltipster("open");
            }).fail(() => {
                $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
            })
            .always(() => {
                setTimeout(function() {
                    $(".tooltip").tooltipster("close");
                }, 1200);
            })
    });

}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function(data) {

        $(data).each(function() {
            let linha = novaLinha(this.usuario, this.pontos)
            $("tbody").append(linha)
            linha.find(".botao-remover").click(removeLinha);
        })
    })
}