// cmd
C:\Users\Juketo\Dropbox\Alura Samples js\Javascript Avançado I\javascript-avancado-i-aula1\aluraframe\server
C:\Users\maciel\Dropbox\Alura Samples js\Javascript Avançado I\javascript-avancado-i-aula1\aluraframe\server
// npm start
http://localhost:3000/
// JSONs -> arrays de textos que são datas(info)
http://localhost:3000/negociacoes/semana
http://localhost:3000/negociacoes/anterior
http://localhost:3000/negociacoes/retrasada

// onreadystatechange guarda uma função para ser executada automaticamente cada vez que há uma alteração no estado da requisição
// 0: requisição ainda não iniciada.
// 1: conexão com o servidor estabelecida.
// 2: requisição recebida.
// 3: processando requisição.
// 4: requisição concluída e a resposta esta pronta.

// exemplo de error first no callback
fs = require('fs');
fs.readFile('./arquivo.txt', function(erro, dados) {
    if(erro) {
        console.log('Um erro ocorreu');
        return;
    }
    console.log(dados);
});

// Para conseguir realizar uma requisição do tipo POST você precisa:
//     HTTP POST para /negociacoes;
//     Usar o cabeçalho Content-type sendo application/json;
//     No body um JSON da negociação.