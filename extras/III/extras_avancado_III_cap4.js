
// boa prática: no constructor só definiar as propriedades

var hoje = new Date()
var n1 = new NegociacaoController(hoje, 1, 100);
var n2 = new NegociacaoController(hoje, 1, 100);
n1 == n2 // retorna false
// n1 é variável de referência; n2 é outra
// indexOf compara do mesmo jeito, via ==
// entretanto, se
n1 = n2 // n2 é destruído no garbage collector
n1 == n2 // retorna true

// mas isso não aplica-se para tipos literais (string, number, bool). Ex:
var nome1 = 'Eu';
var nome2 = 'Eu';
nome1 == nome2 // retorna true
// ou ainda
var x = 10;
var z = 10;
x == y // retorna true

// o construtor de Negociacao fez new Date(data.getTime()), logo
n1.data == n2.data // retorna false
// entretanto
n1.data.getDate() == n2.data.getDate() // retorna true, pq compara os números

// macete para comparar diretor os objetos dentro dos itens
JSON.stringify(n1) == JSON.stringify(n2) // retorna true

var letras = ['a', 'b', 'c', 'd'];
letras.some(letra => console.log(letra)) // retorna a   b   c   d   => false
letras.some(letra => letra == 'b') // retorna true e para de iterar no array no b
letras.some(letra => letra == 'e') // retorna false

passageiros.push(new Passageiro('Francisca', 'Médica'));
passageiros.some(passageiro => /médic/i.test(passageiro.profissao)); // true


// Evitar Callback hell, que é quando tem muitos aninhamentos de then
// ao invés de 
ConnectionFactory
    .getConnection()
    .then(conexao => {
        let dao = new NegociacaoDao(conexao);
        dao.adiciona(new Negociacao(new Date(), 1, 100))
            .then(() => {
                alert('Negociação adicionada com sucesso');            
            });
    })
    .catch(erro => console.log(erro));
// usar
ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 100)))
    .then(() => alert('Negociação adicionada com sucesso'))
    .catch(erro => console.log(erro));

// Promise.all resolve as promises em paralelo, ou seja, uma promise não aguarda 
// a outra terminar para ser executada. É interessante quando uma promise não 
// depende do resultado da promise anterior. Ex:
Promise
    .all([a(), b(), c()])
    .then(arrayComResultadoDasPromises => console.log(arrayComResultadoDasPromises))
    .catch(erroDeAlgumaDasPromises => console.log(erroDeAlgumaDasPromises));
// diferente de quando há encadiamento
a()
.then(dado => {
    console.log(dado);
// O RETORNO DA PROMISE B ESTARÁ DISPONÍVEL NO PRÓXIMO THEN
    return b(); 
})
.then(dado => {
    console.log(dado);
// FORÇANDO A REJEIÇÃO DA PROMISE. TEM QUE IR DIRETO PARA O CATCH. 
// SE NÃO TIVESSE REJEITADO, O RETORNO DE C ESTARIA DISPONÍVEL NO PRÓXIMO THEN
    return c(true);  
})
.then(dado => {
    console.log(dado);
})
.catch(erro => console.log(erro));