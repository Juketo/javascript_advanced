/* transpilers (via babel)

compiladores de código fonte para código fonte comumente 
chamados de transcompiladores

Babel é um módulo do Node.js. Ele é baixado através do npm, 
o gerenciador de pacotes da plataforma Node.js.

Se usarmos promises, o código transcompilado continuará a não funcionar 
caso o navegador não suporte esse recurso, a mesma coisa da Fetch API 
que vimos. Nesses casos, é comum misturar o processo de transcompilação 
com o uso de um ou outro polyfill para tapar aquelas lacunas que o 
transpiler não consegue. 
*/ 

// seleciona a pasta
C:\Users\Juketo\Dropbox\Alura Samples js\Javascript Avançado I\javascript-avancado-i-aula1\aluraframe\server

npm init

npm install babel-cli@6.10.1 --save-dev

npm install babel-preset-es2015@6.9.0 --save-dev

// antes desse próximo, deve remover do client que nao compila
npm run build 

// ---------------------------
//criar .babelrc junto do index
{
    "presets" : ["es2015"]
}

//já no package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel js/app-es6 -d js/app --source-maps"
  },
// --source-maps serve para debugar e apontar o erro na versao ES6

// para garantir que mudanças sejam recompiladas, usar o watch
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel js/app-es6 -d js/app --source-maps"
    "watch": "babel js/app-es6 -d js/app --source-maps --watch"
  },
