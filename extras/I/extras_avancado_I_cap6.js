// expandir o construtor da classe pai, adicionando um segundo input
class Secretaria extends Funcionario {

    constructor(nome, funcionario) {
        super(nome); // cuidado, tem que ser a primeira instrução!
        this._funcionario = funcionario;
    }
    atenderTelefone() {
        console.log(`${this._nome} atendendo telefone` );
    }
}