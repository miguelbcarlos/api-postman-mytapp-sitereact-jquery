var finaisURL = [];
var settings = {
    "url": "https://alrightbrewing.mytapp.com.br/api/v1/getAllTaps",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": "00bca302-dc30-47c3-854c-da608e916397"
    },
};
$(document).ready(function(){
    $.ajax(settings).done(function (response) { 
        dados = response.data;
        finaisCervejas = dados.map(function(e) {return e.tap_id})
         console.log(finaisCervejas);
        for(let i=0; i <finaisCervejas.length; i= i+1){

            finaisURL.push('https://alrightbrewing.mytapp.com.br/devices/info/' + finaisCervejas[i]);
    
            //request do JSON
            let request = new XMLHttpRequest();
            requestURL2 = finaisURL[i];
             console.log(requestURL2);
            request.open('GET', requestURL2);
            request.responseType = 'json';
            request.send();
            request.onload = function() {
                const data = request.response;
                preencher(data,i);
              }
        }
        console.log(finaisURL);
     });
})


function preencher(data,i) {
    const cerveja = data['beer']; //ARRUMANDO ENDREÇO NO data OU ARRAY
    const imagem = data['image'];

    const DIV1 = document.createElement('div');
    DIV1.setAttribute('class', 'col border border-5');
    DIV1.setAttribute('align', 'center');

    const linha = document.createElement('br');

    //nome da cerveja
    const JStitulo1 = document.createElement('h2');
    JStitulo1.textContent = cerveja.name;

    //descrição da cerveja
    const JSdescritivo1 = document.createElement('p');
    JSdescritivo1.textContent = cerveja.description;

    //tipo da cerveja
    const JSTipo1 = document.createElement('p');
    JSTipo1.textContent = cerveja.style;

    //

    //IMAGEM1 REAL
    var img1 = document.createElement('img');
    const teste1 = new URL(imagem.beer_base64);
    var teste2 = teste1.pathname;
    img1.src = 'https://alrightbrewing.mytapp.com.br' + teste2;
    img1.setAttribute('width', '100%');

    //CAIXA DIV
    document.getElementById('row').appendChild(DIV1);
    DIV1.appendChild(JStitulo1);
    DIV1.appendChild(JSdescritivo1);
    DIV1.appendChild(img1);
    DIV1.appendChild(linha);
    DIV1.appendChild(JSTipo1);

}

// // URL DO MYTAPP
// let requestURL2 = 'https://alrightbrewing.mytapp.com.br/devices/info/5'; 

// let request = new XMLHttpRequest();
// request.open('GET', requestURL2);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   const data = request.response;
//   cabecalho(data);
// }

// function cabecalho(obj) {
//     const cerveja = obj['beer']; //ARRUMANDO ENDREÇO NO OBJ OU ARRAY
//     const imagem = obj['image'];

//     //TITULO1
//     const JStitulo1 = document.createElement('h1');
//     JStitulo1.textContent = cerveja.name;
//     document.getElementById('titulo1').appendChild(JStitulo1);

//     //IMAGEM1
//     const myText = document.createElement('p');
//     const teste1 = new URL(imagem.beer_base64);
//     var teste2 = teste1.pathname;
//     //DEBUG
//     myText.textContent = teste1.pathname;
//     //document.getElementById('urlimagem').appendChild(myText);

//     //IMAGEM1 REAL
//     var img = document.createElement('img');
//     img.src = 'https://alrightbrewing.mytapp.com.br' + teste2;
//     document.getElementById('urlimagem').append(img);

//     //DESCRITIVO1 REAL
//     const JSdescritivo1 = document.createElement('p')
//     JSdescritivo1.textContent = cerveja.description;
//     document.getElementById('descritivo1').append(JSdescritivo1);

//     //TIPO DA CERVEJA
//     const JSTipo1 = document.createElement('p');
//     JSTipo1.textContent = cerveja.style;
//     document.getElementById('tipo1').append(JSTipo1);
    

//     }