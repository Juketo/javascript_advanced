export class View 
{
    constructor (elemento)
    {
        this._elemento = elemento;
    }

    // nao tem como colocar abstrato, exigindo a implementação
    template(model)
    {
        throw new Error('The template method have to be implemented');
    }

    update(model)
    {
        this._elemento.innerHTML = this.template(model);
    }
}