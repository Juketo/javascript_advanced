export class HttpService
{
    getAntigo(url)
    {
        return new Promise((resolve, reject) => 
        {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {

                // 0: requisição não iniciada
                // 1: conexão com o servidor estabelecida
                // 2: requisição recebida
                // 3: processando requisição
                // 4: requisição concluída e a resposta está pronta

                if (xhr.readyState == 4)
                {
                    if (xhr.status == 200) // efetuada e tudo deu certo
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else
                    {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        })
    }

    get(url)
    {
        return fetch(url)
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }

    _handleErrors(res)
    {
        if (!res.ok)
            throw new Error(res.statusText);
        
        return res;
    }

    postAntigo(url, dado) 
    {
        return new Promise((resolve, reject) =>
        {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            // usando JSON.stringifly para converter objeto em uma string no 
            // formato JSON.
            xhr.send(JSON.stringify(dado)); 
        });
    }

    post(url, dado)
    {
        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res))
    }
}