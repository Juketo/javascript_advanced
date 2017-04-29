// Padrão de projeto Factory:
// * Ele é utilizado quando precisamos facilitar a criação de um objeto.
// * É ideal quando queremos criar objetos similares, com apenas seus detalhes 
// diferentes, que podemos passar nos argumentos da Factory.
// * É bom para abstrair a criação de um objeto complexo, já que o programador 
// que utilizar a Factory não precisa necessariamente saber como é feita esta 
// operação.

// O padrão de projeto Factory ocorre quando temos uma classe que nos ajuda a 
// criar um objeto complexo, ou seja, ela esconde de nós os detalhes de criação 
// desse objeto. É por isso que uma classe Factory possui apenas um método, faz 
// sentido, porque se tivéssemos que chamar mais de um para criar um objeto a 
// responsabilidade de sua criação cairia em nosso colo.

// retornar tipo específico de uma negociação
// ao invés de usar isso
var negociacao = null;
let tipoNegociacao = "opcao"; //isso poderia vir de um formulário web
if(tipoNegociacao == "opcao") {
    negociacao = new NegociacaoOpcao(/*passando params aqui*/);
} else {
    negociacao = new NegociacaoAcao(/*passando params aqui*/);
}
// usar Factory
class NegociacaoFactory {
    static create(tipoNegociacao, dados) {
        if(tipoNegociacao == "opcao") {
            return new NegociacaoOpcao(dados.data, dados.quantidade, dados.valor);
        }
        return new NegociacaoAcao(dados.data, dados.quantidade, dados.valor);
    }
}
let n = NegociacaoFactory.create("acao", {'data': new Date(), 
                                          'quantidade': 2, 'valor': 34.3});

// exemplo de factory já dentro do javascript:
// let d = Array.from("abc");
// ["a", "b", "c"]