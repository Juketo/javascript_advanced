"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("ListaNegociacoes", ListaNegociacoes = function () {
                function ListaNegociacoes() /*contexto, armadilha*/{
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];

                    // armadilha é mandado para ser triggado depois de cada alteração na lista
                    //this._armadilha = armadilha;
                }

                _createClass(ListaNegociacoes, [{
                    key: "adiciona",
                    value: function adiciona(_negociacao) {
                        // gambiarra para disparar a trap de alterações das prop, evita-se
                        this._negociacoes = [].concat(this._negociacoes, _negociacao);

                        // jeito certo abaixo:
                        //this._negociacoes.push(_negociacao);

                        //this._armadilha(this);
                    }
                }, {
                    key: "esvazia",
                    value: function esvazia() {
                        this._negociacoes = [];
                        //this._armadilha(this);
                    }
                }, {
                    key: "ordena",
                    value: function ordena(criterio) {
                        this._negociacoes.sort(criterio);
                    }
                }, {
                    key: "inverteOrdem",
                    value: function inverteOrdem() {
                        this._negociacoes.reverse();
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {
                        // passa outro objecto (novo array concatenado) para proteger de alterações indevidas
                        return [].concat(this._negociacoes);
                    }
                }, {
                    key: "volumeTotal",
                    get: function get() {
                        return this._negociacoes.reduce(function (total, n) {
                            return total + n.GetVolume();
                        }, 0.0);
                    }
                }]);

                return ListaNegociacoes;
            }());

            _export("ListaNegociacoes", ListaNegociacoes);
        }
    };
});
//# sourceMappingURL=ListaNegociacoes.js.map