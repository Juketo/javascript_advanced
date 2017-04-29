// ecma script 6, todo script é um módulos

// para garantir o fluxo de herança herança correto
// classe mãe
export class View 
//classe filha
import {View} from './View';
class MensagemView extends View {}

// baixando o System.js para organizar a ordem de load dos módulos
C:\Users\Juketo\Dropbox\Alura Samples js\Javascript Avançado I\javascript-avancado-i-aula1\aluraframe\client
npm install systemjs@0.19.31 --save
// importar no index
<script src="node_modules/systemjs/dist/system.js"></script>
<script>
    System.defaultJSExtensions = true;
    System.import('js/app/boot').catch(function(err){
        console.error(err);
    });
</script>
// add file boot.js no folder app-es6

// SystemJs, um carregador de módulos universal que suporta módulos do ES2015. 

// A delegação de eventos é interessante quando temos elementos adicionados dinamicamente
// Ex: jennifer.html
lista.addEventListener('click', function(event) {
        if(event.target.nodeName == 'LI')
            alert(this.textContent)