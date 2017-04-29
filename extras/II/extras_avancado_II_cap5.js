// criar array de única dimensao através de um de múltipla
let dadosServidor = [ 
    [
        [new Date(), 1, 100],
        [new Date(), 2, 100]
    ],
    [
        [new Date(), 1, 150],
        [new Date(), 2, 300]
    ],
    [
        [new Date(), 3, 50],
        [new Date(), 1, 100]
    ]        
];
let listaDeNegociacoes = dadosServidor
        .reduce((novoArray, array) => novoArray.concat(array), [])
        .map(dado => new Negociacao(
            new Date(dado.data), dado.quantidade, dado.valor ));


// promise é assíncrona e não bloqueia a execução do nosso código 
let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('PROMISSE RESOLVIDA'), 5000);
    });
promise.then(resultado => console.log(resultado));
console.log('FIM');
// FIM
// PROMISE CONCLUÍDA

// exemplo de tratamento de resolved/rejected
let ok = false;
let promise = new Promise((resolve, reject) => {

    // como temos mais de uma instrução, precisamos colocar um bloco em nossa arrow function! Lembrou?
    setTimeout(() => {
        if(ok) {
            resolve('PROMISE CONCLUÍDA');
        } else {
            reject('HOUVE PROBLEMAS');
        }
    }, 5000);
});

// Os métodos then e catch, que serão chamados quando a execução concluir com 
// sucesso ou falhou, esperam receber uma função.
promise
    .then(resultado => console.log(resultado))
    .catch(erro => console.log(erro));
