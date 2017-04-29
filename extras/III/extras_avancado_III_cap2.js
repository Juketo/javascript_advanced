// IIFE: função anônima que se invoca automaticamente
(function()
{
// tudo que estiver dentro dela não será mais acessível globalmente
})();

/* Module Pattern
Unidade de código confinada, que não exporta qualquer funcionalidade.
Pattern é muito usado no ES5 para resolver problemas desse tipo, 
entre outros. No entanto, o ES6 possui um sistema de módulos nativos. 
*/
var formatadorDeMoedas = (function()
{
    let simboloMoeda = 'R$ ';
    let modulo = {};
    modulo.numeroParaReal = numero => {
        return simboloMoeda + numero.toFixed(2).replace('.', ',');
    }
    modulo.realParaNumero = texto => {
        return texto.replace(simboloMoeda, '').replace(',', '.');
    }
    return modulo;
})();

/* monkey patch
consiste em mudar o método ou função dinamicamente. 
Tem interesse em mudar o método de uma instância e não de todas.
*/
let pessoa2 = new Pessoa('Almeida', 'Flávio');
// original
obterNomeCompleto() 
{
    return `${this.nome} ${this.sobrenome}`;
}
// modificado
pessoa2.obterNomeCompleto = function()
{
  return `${this.nome} - ${this.sobrenome}`;
}
console.log(pessoa2.obterNomeCompleto());
/*
Foi necessário usar function devido ao seu escopo dinâmico, isto é, 
this deve variar de acordo com a instância no qual obterNomeCompleto 
é chamado. Se usarmos arrow function, seu escopo léxico fará com que 
o this seja sempre do contexto no qual a função é declarada, no caso 
window, o escopo global.
Cuidado: modificações usadas globalmente podem ocasionar bugs.
*/

// usar constantes
const  nome = "Aurélio Siciliano Oxford";
const  CPF  = "134.567.890-12";
// const não garante a imutabilidade, apenas a atribuição de um novo 
// valor para a variável. Ex:
const hoje = new Date();
hoje.setDate(5);
console.log(hoje.getDate()) ; // alterou o dia para 5!