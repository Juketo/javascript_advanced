export class DateHelper
{

    constructor()
    {
        // controle de erro para forçar a utilizar os métodos estáticos
        throw new Error('DateHelper can not be instancied');
    }

    static textoParaData(texto)
    {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Must be on yyy-MM-dd format');

        // // o .value retorna string, e a classe Negociacao pede um Date, logo, precisa converter. Checar com typeof(object)
        // let data = new Date(this._inputData.value.split('-'))
        // // /-/g é uma regex
        // let dataOpcao2 = new Date(this._inputData.value.replace(/-/g, ','))
        // let dataOpcao3 = new Date
        // (
        //     ... // ... desmembra um array passado (no caso, montado no split) 
        //     this._inputData.value
        //     .split('-') 
        //     // map é tipo um lambda que percorre o array e pode identificar [indices]
        //     .map((item, indice) => // Arrow function equivale a ".map(function(item, indice)"
        //     {
        //         if (indice == 1)
        //         { 
        //             // o item no segundo índice (1) é o mês, e no Date, vai de zero até 11 (dezembro)
        //             return item - 1;
        //         }
        //         return item;
        //         // ou poderia ser "return item - indice % 2", o que faria nao precisar de if
        //     })            
        //     // Arrow function (=>) quando só uma linha, nao precisa usar {} nem return
        //     //ex: .map((item, indice) => item - indice % 2)
        // )

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

    static dataParaTexto(data)
    {
        // para evitar concatenações, usa-se `blabla $(data) blabla`
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }
}