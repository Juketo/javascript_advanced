import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

/*export*/ class NegociacaoController
{

    constructor()
    {
        // da para criar atalhos para "chamamentos". Precisa dar o bind(document) 
        // pq se não ele perde o contexto this
        let $ = document.querySelector.bind(document); 

        // é melhor declarar os elementos no constructor via "this." pq ele só 
        // chama uma vez, mesmo se adicionar N itens. Tipo cash      
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // quando a página for carregada, não tem critério. Só passa a ter 
        // quando ele começa a clicar nas colunas
        this._ordemAtual = ''; 

        //let self = this;

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        
        //this._listaNegociacoes = 
        //    new ListaNegociacoes(model => this._negociacoesView.update(model) );
        //this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Bind(new Mensagem(), 
            new MensagemView($('#mensagemView')), 'texto');
        //this._mensagemView.update(this._mensagem)

        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    // Initialize serve para colocar código que nao quer que fique no construtor
    _init()
    {

        this._service.lista()
                .then(negociacoes => {
                    negociacoes.forEach(negociacao =>
                    {
                        this._listaNegociacoes.adiciona(negociacao);
                    });
                })
                .catch(erro => this._mensagem.texto = erro);

        // ConnectionFactory
        //     .getConnection()
        //     .then(connection => new NegociacaoDao(connection))
        //     .then(dao => dao.listaTodos())
        //     .then(negociacoes => 
        //         negociacoes.forEach(negociacao => 
        //             this._listaNegociacoes.adiciona(negociacao)))
        //     .catch(erro => {
        //         console.log(erro);
        //         this._mensagem.texto = erro;
        //     })

            // .then(connection =>
            // {
            //     new NegociacaoDao(connection)
            //         .listaTodos()
            //         .then(negociacoes => {
            //             negociacoes.forEach(negociacao =>
            //             {
            //                 this._listaNegociacoes.adiciona(negociacao);
            //             });
            //         });
            // });

            setInterval(() => 
            {
                this.importaNegociacoes();
            }, 3000);
    }

    adiciona(event)
    {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service.cadastra(negociacao)
                .then(mensagem => 
                {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = mensagem;
                    this._limpaFormulario();
                })
                .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes()
    {
        this._service.importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => 
        {
            negociacoes.forEach(negociacao => 
                this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas.';
        })
        .catch(erro => this._mensagem.texto = erro);

        // // para fazer em ordem, usa-se Promise.All
        // Promise.all([
        //             service.obterNegociacoesDaSemana(),
        //             service.obterNegociacoesDaSemanaAnterior(),
        //             service.obterNegociacoesDaSemanaRetrasada()]
        //            ).then(negociacoes => {
        //                negociacoes
        //                // como ele retorna 3 negociacoes em 3 arrays, deve-se concatená-los via reduce
        //                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        //                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //                this._mensagem.texto = 'Negociações importadas com sucesso!';
        //             })
        //             .catch(erro => this._mensagem.texto = erro);

    }

    apaga()
    {
        this._service.apaga()
                .then(mensagem => 
                {
                    this._mensagem.texto = 'Negociações apagadas com sucesso!';
                    this._listaNegociacoes.esvazia();
                })
                .catch(erro => this._mensagem.texto = erro);

        // ConnectionFactory
        //     .getConnection()
        //     .then(connection => new NegociacaoDao(connection))
        //     .then(dao => dao.apagaTodos())
        //     .then(mensagem => 
        //     {
        //         this._mensagem.texto = 'Negociações apagadas com sucesso!';
        //         this._listaNegociacoes.esvazia();
        //     });

        //this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao()
    {
        return new Negociacao
        (
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value), 
            // para garantir que salva como numerico no DB
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario()
    {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) 
    {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } 
        else 
        {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }

        this._ordemAtual = coluna;
    }
}

// singleton para permitir reordenar as colunas
let negociacaoController = new NegociacaoController();

export function currentInstance()
{
    return negociacaoController;
}