// expressão regular para teste de input
let codigo = 'GWZ-JJ-12';
function validaCodigo(codigo) {

    if(/\D{3}-\D{2}-\d{2}/.test(codigo)) {
          alert('Código válido!');
      } else {
          alert('Código inválido');
      }
}
validaCodigo('GWZ-JJ-12'); // válido
validaCodigo('1X1-JJ-12'); // inválido
// concatenar listas (e items)
let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2, 'Rômulo'));
// se o usuário digitar um ano com mais de 4 dígitos 
// ou um dia com mais de dois dígitos ela considerará como correta.
// Logo, ˆ indica "começando com " e o $ "terminando com".
/^\d{4}-\d{2}-\d{2}$/

// extras do index
    var n1 = new Negociacao(new Date, 5, 700);

    // usar let no lugar de var, pois não impossibilita o uso fora do bloco{}
    let volume = n1.GetVolume();
    let quantidade = n1.quantidade;
    console.log(volume, quantidade);

    var amanha = new Date();
    amanha.setDate(11);;
    n1.data = amanha;

    console.log(n1.data);

    n1.data.setDate(12);

    console.log(n1.data);

    for (var i = 1; i<= 100; i++)
    {
        console.log(i);
    }
    alert(i); // está acessível e resulta em 101, pois não tem escopo por bloco{}
