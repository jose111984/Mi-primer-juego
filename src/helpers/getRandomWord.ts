let words:string [] = [
    'ORDENADOR',
    'AGUACATE',
    'MANZANA',
    'VEHICULO',
    'ANIMAL',
    'VETERINARIO',
    'LLUVIA',
    'TELEFONO'
];


export function getRandomWord() {

    const randoIndex = (Math.floor( Math.random() * words.length));



    return words [randoIndex];
}