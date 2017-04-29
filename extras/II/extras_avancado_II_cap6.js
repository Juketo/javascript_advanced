// Firerfox (v45-) não aceita input do tipo Date

// Safari só aceita 'let' dentro bloco. Exemplo que não funciona
<script>
    let negociacaoController = new NegociacaoController();
</script>

// Microsoft Edge não possui o método includes de Array

// polyfill é um script que emula o comportamento de um recurso quando 
// esse não é suportado para garantir que nosso código funcione sem termos 
// que abdicar do que é mais novo.
// aluraframe/client/app/js/polyfill/es6.js
if(!Array.prototype.includes) {
    // Se não existir, adiciona
    console.log('Polyfill para Array.includes aplicado.');
    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    };
}
// Edge 13 não suporta parâmetros opcionais do ES6

// Transpiler é um compilador que traduz o código fonte de uma 
// linguagem para outra. Ex: ES6 para ES5 visando a compatibilidade