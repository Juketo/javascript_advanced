import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService
{

    constructor()
    {
        this._http = new HttpService();
    }

    // cb -> callback
    obterNegociacoesDaSemana()
    {
        // resolve é função de retorno de sucesso; reject passa o erro
        return new Promise((resolve, reject) => 
        {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                      resolve(negociacoes.map(objeto => new Negociacao(
                        new Date(objeto.data), objeto.quantidade, objeto.valor)))
                      })
                      .catch(erro => {
                        console.log(erro);
                        reject('Não foi possível obter as negociações da semana')
                      })
            
        });
    }

    obterNegociacoesDaSemanaAnterior(cb)
    {
        return new Promise((resolve, reject) => 
        {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                      resolve(negociacoes.map(objeto => new Negociacao(
                        new Date(objeto.data), objeto.quantidade, objeto.valor)))
                      })
                      .catch(erro => {
                        console.log(erro);
                        reject('Não foi possível obter as negociações da semana anterior')
                      })
            
        });
    }

    obterNegociacoesDaSemanaRetrasada(cb)
    {
        return new Promise((resolve, reject) => 
        {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                      resolve(negociacoes.map(objeto => new Negociacao(
                        new Date(objeto.data), objeto.quantidade, objeto.valor)))
                      })
                      .catch(erro => {
                        console.log(erro);
                        reject('Não foi possível obter as negociações da semana retrasada')
                      })
            
        });
    }

    obterNegociacoes()
    {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    }

    // usando este método, no NegociacaoControler ficaria assim:
    // importaNegociacoes() {

    //     let service = new NegociacaoService();
    //     service
    //     .obterNegociacoes()
    //     .then(negociacoes => {
    //       negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    //       this._mensagem.texto = 'Negociações do período importadas com sucesso';
    //     })
    //     .catch(error => this._mensagem.texto = error);  
    // }

    cadastra(negociacao)
    {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(erro => 
            {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação')
            });
    }
    
    lista()
    {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro =>
            {
                console.log(erro);
                throw new Error('Não foi possível obter todas as negociações');
            });
    }

    apaga()
    {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso!')
            .catch(erro =>
            {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            })
    }

    importa(listaAtual)
    {
        //promisse é assíncrona
            return this.obterNegociacoes()
                    // filtra para só adicionar as que não tem na lista
                    .then(negociacoes => 
                        negociacoes.filter(negociacao => 
                            !listaAtual.some(negociacaoExistente => 
                                negociacao.isEquals(negociacaoExistente)))
                            // "!" pq retorna false, só adicionando as que nao existem
                    )
                    .catch(erro => 
                    {
                        console.log(erro);
                        throw new Error('Não foi possível importar as negociações');
                    });
    }
}

// como HttpService retorna uma promisse, daria para não nao retornar uma nova
class NegociacaoServiceOutro {
    constructor() {

        this._http = new HttpService();
    }
    obterNegociacoesDaSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });  
    }
}

