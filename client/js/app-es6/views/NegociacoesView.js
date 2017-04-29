import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacoesView extends View
{
    constructor (elemento)
    {
        // super pra usar o construtor do pai
        super(elemento);

        elemento.addEventListener('click', function(event)
        {
            if (event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
        });
    }

    template (model)
    {
        // <th onclick="negociacaoController.ordena('data')">DATA</th>
        // <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
        // <th onclick="negociacaoController.ordena('valor')">VALOR</th>
        // <th onclick="negociacaoController.ordena('volume')">VOLUME</th>

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
<thead>
    <tr>
        <th>DATA</th>
        <th>QUANTIDADE</th>
        <th>VALOR</th>
        <th>VOLUME</th>
    </tr>
</thead>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map(n => `

                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.GetVolume()}</td>
                        </tr>

                    `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }

// no rodapé poderia usar o código abaixo, no entanto é melhor usar o reduce
// let total = 0;
// model.negociacoes.forEach(n => total += n.GetVolume());
// return total;

}