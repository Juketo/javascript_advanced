import {View} from './View';

export class MensagemView extends View
{
    constructor (elemento)
    {
        // super pra usar o construtor do pai
        super(elemento);
    }

    template(model)
    {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}

