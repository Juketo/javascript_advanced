export class ListaNegociacoes
{
    constructor(/*contexto, armadilha*/)
    {
        this._negociacoes = [];
        
        // armadilha é mandado para ser triggado depois de cada alteração na lista
        //this._armadilha = armadilha;
    }

    adiciona(_negociacao)
    {
        // gambiarra para disparar a trap de alterações das prop, evita-se
        this._negociacoes = [].concat(this._negociacoes, _negociacao);

        // jeito certo abaixo:
        //this._negociacoes.push(_negociacao);

        //this._armadilha(this);
    }

    get negociacoes()
    {
        // passa outro objecto (novo array concatenado) para proteger de alterações indevidas
        return [].concat(this._negociacoes);
    }

    esvazia()
    {
        this._negociacoes = [];
        //this._armadilha(this);
    }

    get volumeTotal() 
    {
       return this._negociacoes.reduce((total, n) => total + n.GetVolume(), 0.0);
    }

    ordena(criterio) 
    {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem() 
    {
        this._negociacoes.reverse();
    }
    
}