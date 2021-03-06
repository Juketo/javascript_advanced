'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    // controle de erro para forçar a utilizar os métodos estáticos
                    throw new Error('DateHelper can not be instancied');
                }

                _createClass(DateHelper, null, [{
                    key: 'textoParaData',
                    value: function textoParaData(texto) {
                        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Must be on yyy-MM-dd format');

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

                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                            return item - indice % 2;
                        })))))();
                    }
                }, {
                    key: 'dataParaTexto',
                    value: function dataParaTexto(data) {
                        // para evitar concatenações, usa-se `blabla $(data) blabla`
                        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map