const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');

const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');

const signos = {
    sumar: '+',
    restar: '-',
    multiplicar: 'x',
    dividir: '/'
}

class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }
}

let calculadora = new Calculadora();

let valorActual = '';
let valorAnterior = '';

let tipoOperacion = undefined;

function borrarNumero() {
    valorActual = valorActual.toString().slice(0, -1);
    imprimirValores();
}

function borrarTodo() {
    valorActual = '';
    valorAnterior = '';
    tipoOperacion = undefined;
    imprimirValores();
}

function computar(tipo) {
    tipoOperacion !== 'igual' && calcular();
    tipoOperacion = tipo;
    valorAnterior = valorActual || valorAnterior;
    valorActual = '';
    imprimirValores();
}

function agregarNumero(numero) {
    if (numero == '.' && valorActual.includes('.')) {
        return;
    }
    valorActual = valorActual.toString() + numero.toString();
    imprimirValores();
}

function imprimirValores() {
    displayValorActual.textContent = valorActual;
    displayValorAnterior.textContent = `${valorAnterior} ${signos[tipoOperacion] || ''}`;
}

function calcular() {
    const valorAnterior1 = parseFloat(valorAnterior);
    const valorActual1 = parseFloat(valorActual);

    if (isNaN(valorActual1) || isNaN(valorAnterior1)) {
        return
    }
    valorActual = calculadora[tipoOperacion](valorAnterior1, valorActual1);
    tipoOperacion = undefined;
    imprimirValores();
}

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.innerHTML);
    })
})

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => {
        computar(boton.value);
    })
})