C:\Users\Juketo\Dropbox\Alura Samples js\Javascript Avançado I\javascript-avancado-i-aula1\aluraframe\server
// npm start

// obtém corretamente a store negociacoes
let transaction = connection.transaction(['negociacoes'],'readwrite');
let store = transaction.objectStore('negociacoes');

// controle de erros
let negociacao = new Negociacao(new Date(), 200, 1);
let request = store.add(negociacao);
request.onsuccess = e => {
  alert('Adicionado com sucesso!');
};
request.onerror = e => {
  alert('Não foi possível adicionar');
};

// iterando via cursor numa store
let cursor = store.openCursor();
    cursor.onsuccess = e => {
    let atual = e.target.result;
    if(atual) {
        let dado = atual.value;
        negociacoes.push(new Negociacao(
            dado._data, dado._quantidade, dado._valor));
        // precisamos chamar cursor.continue() para que o ponteiro 
        // avance para o próximo elemento. 
        // Quando não ouver mais, "continue()" será null
        atual.continue();
    } else { 
        console.log(negociacoes);
    }
};

// O evento onupgradeneeded só será disparado se a nova versão do banco, 
// indicada para a função open, for superior à versão do banco no 
// IndexedDB
var openRequest = window.indexedDB.open("aluraframe",2);
