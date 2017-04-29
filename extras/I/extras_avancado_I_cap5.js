// usando o reduce para pegar o produtório (resultado da multiplicacao de todos items)
let numeros = [1, 2, 3, 4];
let resultado = numeros.reduce(function(total, num) {
    return total * num;
}, 1);

// reduce usando arrow function
numeros.reduce((total, num) => total * num, 1);

// map que retorna dobro, metade e raíz quadrada
let dobro = numeros.map(function(num) {
    return num * 2;
});
let metade = numeros.map(function(num) {
    return num/2;
});
let raiz = numeros.map(function(num) {
    return Math.sqrt(num);
});
// ou com array
let dobro = numeros.map(num => num * 2);
let metade = numeros.map(num => num/2);
let raiz = numeros.map(num => Math.sqrt(num));

