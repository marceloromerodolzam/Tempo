var inputCidade = document.getElementById('inpCidade');
var temperatura = document.getElementById('temperatura');
var condicoes = document.getElementById('condicoes');
var imgTempo = document.getElementById('imgTempo');

inputCidade.addEventListener('keypress', function(event){

    if(event.key === 'Enter'){
        
        var cidade = inputCidade.value;

        localStorage.setItem('cidade', cidade);

        obterDadosTempo(cidade);
        
    }

});


//ao carregar a página vérifica se não tem alguma cidade salva
window.addEventListener('load', function(){

    var salvaDados = localStorage.getItem('cidade');

    if(salvaDados){

        inputCidade.value = salvaDados;

        obterDadosTempo(salvaDados);

    }

});

function obterDadosTempo(cidade){

    fetch(`https://api.weatherapi.com/v1/current.json?key=cfa8cbfc400047cda1d224403231710&q=${cidade}`)

    //converte a resposta da API para JSON
    .then(response => response.json())

    .then( data => {

        temperatura.innerHTML = `Temperatura: ${data.current.temp_c}°C`;

        condicoes.innerHTML = `/Concições: ${data.current.condition.text}`;

        imgTempo.src = data.current.condition.icon;

        imgTempo.alt = data.current.condition.text;

    })

    .catch(error => {

        console.error('Erro ao obter dados do tempo:', error);

    })

}