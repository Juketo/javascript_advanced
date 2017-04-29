export class Negociacao{

    constructor(data, quantidade, valor){

        // this.data = new Date();
        // this.quantidade = 1;
        // this.valor = 0.0;

        // usa-se _ antes do nome para dizer que atributo nao pode ser alterado de fora
        this._data = new Date(data.getTime()); // programação defensiva
        this._quantidade = quantidade;
        this._valor = valor;

        // congela o objeto para ser read only
        Object.freeze(this);
    }

    // dentro de classe se chama método, fora, é função
    GetVolume(){
        return this.quantidade * this.valor;
    }

    get data() {
        // retorna uma cópia do objeto, assim não deixa vulnerável à alterações
        return new Date(this._data.getTime());
    }

    // é a mesma coisa que o GetVolume, só que é melhor usá-lo assim
    get quantidade() {
        return this._quantidade;
    }

    // é bom para deixar as variáveis privadas
    get valor() {
        return this._valor;
    }

    // o ideal é usar JSON.stringify dentro da própria classe de dados
    isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}