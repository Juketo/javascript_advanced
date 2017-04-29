import {ProxyFactory} from '../services/ProxyFactory';

export class Bind
{
    // usa-se ... antes do último parâmetro para não precisar 
    // passar array, mas sim quantos objetos quiser
    constructor(model, view, ...props)
    {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));

        view.update(model);

        return proxy;
    }

    // quando declarado sem a classe Bind, no controller, era assim:
    // ProxyFactory.create(
    // new ListaNegociacoes(), 
    // ['adiciona', 'esvazia'], model => 
    //     this._negociacoesView.update(model));
}
