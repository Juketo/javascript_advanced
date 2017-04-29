// faz array com os text fields do usuário
var campos = [
document.querySelector('#data'),
document.querySelector('#quantidade'),
document.querySelector('#valor'),
];

// printa no console como helper
console.log(campos);

// busca a tag tbody onde vai ser preenchida a nova table
var tbody = document.querySelector('table tbody');

// busca o submit da classe form e adiciona o evento function
document.querySelector('.form').addEventListener('submit', function(event)
{
    // retira o carregamento automático da página
    event.preventDefault();

    // cria o elemento tr
    var tr = document.createElement('tr');

    // para cada item do campos,
    campos.forEach(function(campo){

        // cria elemento tr, que contém o valor do campo atual
        var td = document.createElement('td');
        td.textContent = campo.value;
        // append o td criado para a tr criada
        tr.appendChild(td);

    })

    // cria td volume
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);

    // append tr no tbody
    tbody.appendChild(tr);

    // limpar os campos
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();

    // alert('oi');
});