// Pattern DAO
/*
Objeto de Acesso aos Dados. Abstrai acesso ao banco.

A vantagem está ligada com a capacidade de isolar todo 
o código que acessa seu repositório de dados em um único lugar.

DAO faz parte da camada de persistência, funciona como uma 
fachada para a API do IndexedDB.
*/
ConnectionFactory
    .getConnection()
    .then(connection => {

        let dao = new NegociacaoDao(connection);
        let negociacao = new Negociacao(new Date(), 1, 100);
        dao.adiciona(negociacao)
            .then(() => {
                // faz algo
            })

    });

/*
Classe DAO deve:

    Ter como dependência uma connection.
    Operar em uma store específica.
    Retornar uma promise em seus métodos de persistência.
*/
class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }
    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
        });
    }
    listaTodos() {
        return new Promise((resolve, reject) => {
        });
    }
}

// ConnectionFactory e NegociacaoDao
ConnectionFactory
    .getConnection()
    // retorna uma promise, quando encadeamos uma chamada à função then temos acesso à conexão
    .then(conexao => new NegociacaoDao(conexao))
    // Como houve um retorno, o dao está disponível na próxima chamada à função then
    .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 200.13)))
    // adiciona devolve uma promise e há um retorno implícito da nossa arrow function
    .then(() => console.log('adicionado com sucesso'))
    // Caso algum erro ocorra, o código passado para o catch será executado.
    .catch(() => console.log('não foi possível adicionar'));

/*
IndexedDB 

Transações do IndexedDB são auto commited, quando o evento onsuccess é chamado a transação é fechada.
Podemos cancelar uma transação através do método abort, estilo callback.

Para lidar também com o o IndexedDB outros desenvolvedores tornaram públicas suas bibliotecas. 
Por exemplo, há o Dexie e o Db.js, este último utiliza promises assim como fizemos.
*/
ConnectionFactory
    .getConnection()
    .then(connection => {
        let transaction = connection.transaction(['negociacoes'], 'readwrite');
        let store = transaction.objectStore('negociacoes');let negociacao = new Negociacao(new Date(), 1, 200);
        let request = store.add(negociacao);
        // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
        transaction.abort();
// DOMException: The transaction was aborted, so the request cannot be fulfilled.
// Não foi possível incluir a negociação

// Podemos tratar os erros de uma transação abortada no evento onabort da transação, 
// ao invés de lidarmos com ele em onerror
let request = store.add(negociacao);
    // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
    transaction.abort(); 
    transaction.onabort = e => {
        console.log(e);
        console.log('Transação abortada');
    };
    request.onerror = e => {
        console.log('Não foi possível incluir a negociação');
    };