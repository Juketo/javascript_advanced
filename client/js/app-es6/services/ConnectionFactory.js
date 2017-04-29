
// var ConnectionFactory = (function () //funcao anonima para nao ser chamada
// { // no ecmascript 2015, os módulos são protegidos e isso nao aparece mais no escopo global
const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

// nao pode criar no constructor pq em Factorys nao é permitido
let connection = null;

let close = null;

export class ConnectionFactory
{

    constructor()
    {
        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection()
    {
        return new Promise((resolve, reject) => 
        {
            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => 
            {
                ConnectionFactory._createStores(e.target.result);
            }

            openRequest.onsuccess = e => 
            {
                // 0, string em branco, undefied e null é false
                if (!connection)
                {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function()
                    {
                        throw new Error('Você não pode fechar diretamente a conexão.')
                    }
                }

                resolve(connection);
            }

            openRequest.onerror = e => 
            {
                console.log(e.target.error);

                reject(e.target.error.name);
            }
        });
    }

    static _createStores(connection)
    {
        stores.forEach(store => 
        {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);
                
        connection.createObjectStore(store, { autoincrement: true });

        });
    }

    static closeConnection()
    {
        if (connection)
        {
            close(); 
            // ou Reflect.apply(close, connection, []) -> sem o bind lá em cima
            connection = null;
        }
    }
}
//})(); // função auto-invocada

// serve para proteger os elementos para nao ser chamado de fora (via console)
//var ConnectionFactory = tmp();