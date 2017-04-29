export class ProxyFactory
{
    static create(objeto, props, acao)
    {
        return new Proxy(objeto, 
        { // aqui é o handler, onde se colocam as traps
        // get pra quando ler prop, set pra quando alterar
        // target aqui seria a lista de negociações
        // value é o novo valor
            get(target, prop, receiver) /*: function*/
            {
                // checa se a propriedade lida (get) é um da lista passada
                // e é uma função
                // props contém as propriedades que quer monitorar? ex: esvazia, adiciona
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop]))
                {
                    return function()
                    {
                        console.log(`interceptando ${prop}`)

                        // substitui o adiciona ou esvazia no Proxy, por uma nova função.
                        // arguments é variável implícita que dá acesso a 
                        // todos parâmetros da função quando é chamada
                        let retorno = Reflect.apply(target[prop], target, arguments);

                        //self._negociacoesView.update(target);
                        acao(target)
                        return retorno;
                    }
                }
                
                // segue o baile
                return Reflect.get(target, prop, receiver);
            },

            // para garantir que todas propriedades vão ser disparadas
            set(target, prop, value, receiver) 
            {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop))
                    acao(target);
                    
                return retorno;
            }
        });
    }

    static _ehFuncao(func)
    {
        return typeof(func) == typeof(Function);
    }
}