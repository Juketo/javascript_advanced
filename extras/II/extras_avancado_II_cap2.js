/*
O padrão de projeto Proxy nada mais é do que um objeto 
"falso", "mentiroso", que envolve e encapsula o objeto real que 
queremos interagir. É como se fosse uma interface, entre o objeto 
real e o resto do código. Conseguimos assim controlar o acesso aos 
seus atributos e métodos. Nele também podemos pendurar códigos que 
não cabem de estar alocados nos nossos modelos, mas que necessitam 
ser executados no caso de uma alteração ou atualização do mesmo.

Pense em proxies como "cascas" que envolvem objetos. Dentro desse 
contexto, só podemos "tocar" os objetos encapsulados passando pelo 
proxy.
*/
let pessoa = { nome: 'Flávio' }
let pessoaProxy = new Proxy(pessoa, {
    get(target, prop, receiver) {
         //...
    }
});
/*
O target é o objeto real que é encapsulado pela proxy. É este objeto 
que não quisemos "sujar" com armadilhas ou qualquer código que não diga 
respeito ao modelo.

O prop é a propriedade em si, que está sendo lida naquele momento.

O receiver é a referência ao próprio proxy. É na configuração do 
handler do Proxy que colocamos armadilhas.
*/

// Crie um proxy para este objeto, exibindo no console a mensagem 
// "Armadilha aqui", toda vez que a propriedade email for lida.
let funcionario = {email: 'abc@abc.com'};
let funcionarioProxy = new Proxy(funcionario,
{
    get (target, prop, receiver)
    {
        console.log('Armadilha aqui!');
        return Reflect.get(target, prop, receiver);
        // ou return target[prop]; //da na mesma
    }
});
// retorna o valor entre **.**
get(target, prop, receiver) {
        console.log('Armadilha aqui!');
        return '**' + Reflect.get(target, prop, receiver) + '**' ;        
    }
// exibe msg antes da alteração do objeto
set(target, prop, value, receiver) {
        console.log(`Valor antigo ${target[prop]}, valor atual: ${value}`);
        return Reflect.set(target, prop, value, receiver);
        // ou target[prop] = value;
        // A diferença é que essa última solução altera diretamente o valor 
        // o objeto encapsulado. A primeira forma, com Reflect.set sempre 
        // deve retornar um valor, que é uma função que será chamada para 
        // realizar a operação de atribuição. 
    }
// A mensagem do proxy é exibida duas vezes! É que email é um setter. 
// Nosso proxy irá executar seu código quando o setter for chamado e 
// também para a propriedade _email, que é modificada pelo setter. 

// OBS:  armadilhas serão disparadas mesmo se tentarmos modificar uma 
// propriedade congelada de um objeto, ainda que ele não seja modificado.




// arguments acessa parâmetros passados onde não haveria:
function exibeNomeCompleto() {

  alert(`${arguments[0]} ${arguments[1]}`);
}
exibeNomeCompleto('Flávio', 'Almeida');

// interceptar o método grito
class Pessoa {
    constructor(nome) {
        this._nome = nome;
    }
    grita(frase) {
            return `${this._nome} grita ${frase}`;
    }
}
let pessoa = new Proxy(new Pessoa('Barney'), {
    get(target, prop, receiver) {
        if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {
        // essa função retornada irá substituir o método 'grita' no proxy!!! 
        // Ou seja, estamos usando o handler do proxy para modificar o próprio 
        // proxy, que loucura!
            return function() {
                console.log(`Método chamado: ${prop}`);    
                // Quando usarmos Reflect.apply, Reflect.get e Reflect.set 
                // precisamos retornar o resultado da operação com return
                // arguments é uma variável implícita que dá acesso à todos os 
                // parâmetros recebidos pelo método/função
                return Reflect.apply(target[prop], target, arguments);       
            }
        }
        // só executa se não for função
        return Reflect.get(target, prop, receiver);
    }
});
pessoa.grita('Olá');