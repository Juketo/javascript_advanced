// listar alunos que passaram
class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
    }
}
class Prova {
    constructor(aluno, nota) {
        this.aluno = aluno;
        this.nota = nota;
    }
}
var avaliacoes = [
    new Prova(new Aluno(1, 'Luana'), 8),
    new Prova(new Aluno(2, 'Cássio'), 6),
    new Prova(new Aluno(3, 'Barney'), 9),
];
let aprovados = avaliacoes
    .filter(prova => prova.nota >= 7)
    .map(prova => prova.aluno.nome);
console.log(aprovados);

// tratar array evitando [0]
function somaDoisNumeros(numero1, numero2) {
    return numero1 + numero2;                                            
}
let numeros = [10, 30];
console.log(somaDoisNumeros(...numeros));

// dobrar todos números pares
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map(item =>  item % 2 ? item * 2 : item);
console.log(novosNumeros);

// une duas listas
let lista1 = ['banana', 'laranja', 'mamão'];
let lista2 = ['caju', 'tangerina', 'abacaxi'];
lista1.push(...lista2); // lista1.push(lista2) adicionaria um 4º item do tipo lista