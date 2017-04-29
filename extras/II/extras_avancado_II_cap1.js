// passando o contexto e dando Reflact... this, diferente de arrow function, 
// é dinamico varia de acordo com o contexto
this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
    this._negociacoesView.update(model);
});
constructor(contexto, armadilha)
{
    this._negociacoes = [];
    // armadilha é mandado para ser triggado depois de cada alteração na lista
    this._armadilha = armadilha;
    this._contexto = contexto;
}
adiciona(_negociacao)
{
    this._negociacoes.push(_negociacao);
    //this._armadilha(this);
    // O Replect.apply muda o contexto do "this", como se fosse um "as"
    Reflect.apply(this._armadilha, this._contexto, [this]);
}
// é a mesma coisa que abaixo. 
// Usando arrow function, o contexto é léxico, ou seja, o escopo está amarrado
this._listaNegociacoes = new ListaNegociacoes(model => 
            this._negociacoesView.update(model) );
constructor(contexto, armadilha)
{
    this._negociacoes = [];
    // armadilha é mandado para ser triggado depois de cada alteração na lista
    this._armadilha = armadilha;
}

adiciona(_negociacao)
{
    this._negociacoes.push(_negociacao);
    this._armadilha(this);
}

// this dinâmico atrapalhando o código -> não funciona
constructor() 
{
    this._codigo = 2;
}
imprime(nomes) 
{
    nomes.forEach(function(nome) {
        console.log(this);
        console.log(`${this._codigo}: ${nome}`);
    });
}
let nomes = ['Flávio', 'Nico', 'Douglas'];
let si = new SistemaImpressao();
si.imprime(nomes);
// this léxico, que não permite alteração -> código funciona
constructor()
{
    this._codigo = 2;
}
imprime(nomes) 
{
    nomes.forEach(nome => {
        console.log(this);
        console.log(`${this._codigo}: ${nome}`);
    });
}
let nomes = ['Flávio', 'Nico', 'Douglas'];
let si = new SistemaImpressao();
si.imprime(nomes);

// léxico falhando o código
let carro = {
    velocidade: 100,
    acelera : () =>  {
        console.log(this);
        console.log(`Carro a ${this.velocidade} km por hora!`);
    }
};
carro.acelera();
// this dinâmico fazendo o código funcionar
let carro = {
    velocidade: 100,
    acelera :function() {
        console.log(this);
        console.log(`Carro a ${this.velocidade} km por hora!`);
    }
};
carro.acelera();

/*
Reflact: O primeiro parâmetro é o método ou função que 
desejamos invocar. O segundo parâmetro é o contexto que o método ou função 
adotará, ou seja, o valor que será assumido pelo this. Por fim, o último 
parâmetro é um array que contém todos os parâmetros que o método passado 
como primeiro parâmetro receberá. Como ele não recebe parâmetro nenhum, 
passamos um array vazio.
*/
let objeto1 = { nome: 'Bob' };
let objeto2 = { nome: 'Leo' };
function exibeNome() { alert(this.nome); } 
// resulta undefined, entretando
Reflect.apply(exibeNome, objeto1, []); // exibe 'Bob'
// ou passando 2 parâmetros
Reflect.apply(exibeNome, objeto1, ['(', ')']); // exibe '(Bob)'

// Alternativa à Herança é a Composição
// Este não precisa usar tudo do pai, apenas o que interessa
class Aviao {
    constructor(nome) {
        this._nome = nome;
    }
    voa() {
        alert(`${this._nome} está voando`);
    }
    ligaMotor() {
        console.log('liga o motor');
    }
    fechaPortas() {
        console.log('Portas sendo fechadas');
    }
}
class Passarinho {
    constructor(nome) {
        this._nome = nome;
        // guarda uma instância de avião
        this._aviao = new Aviao(nome);
    }
    voa() {
        // usa o método voa de Aviao
        this._aviao.voa();
    }
}
// Ou ainda pode-se usar Mixin, que não precisa instanciar aviao
class Passarinho {
    constructor(nome) {
        this._nome = nome;
    }
    voa() {
        // executa o método `voa` de `Avião` usando como contexto 
        // a instância de `Passarinho`
        Reflect.apply(Aviao.prototype.voa, this, []);
        // foi necessário fazer Aviao.prototype.voa porque métodos 
        // criados usando ES6 são adicionados no prototype. Qualquer método 
        // adicionando em prototype estará disponível para todas as instâncias. 
        // No ES5, seria "Aviao.prototype.voa.apply(this, [])"
    }
}

// DÚVIDA: o que o React ta fazendo aqui?
constructor(contexto, armadilha) {
    this._negociacoes = [];
    this._armadilha = armadilha;
    this._contexto = contexto;
}
adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    Reflect.apply(this._armadilha, this._contexto, [this]);
}

