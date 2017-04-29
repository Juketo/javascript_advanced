export class Mensagem
{
    // valor default no construtor
    constructor(texto = '')
    {
        this._texto = texto;
    }

    get texto()
    {
        return this._texto;
    }

    set texto(texto)
    {
        this._texto = texto;
    }
}