const words = [
    "JUEGO", "CODIGO", "TECLADO", "RATON", "MONITOR", 
    "COMPUTADORA", "PROGRAMACION", "VARIABLE", "FUNCION", 
    "OBJETO", "CONSTANTE", "ALGORITMO", "COMPILADOR", 
    "PANTALLA", "PROCESADOR", "MEMORIA", "ARCHIVO", 
    "INTERNET", "SERVIDOR", "RED", "NAVEGADOR", 
    "BASE", "DATOS", "SEGURIDAD", "INTERFAZ"
];
const btn_reiniciar = document.getElementById('reset');
const btn_aleatorio = document.getElementById('random-word');
let selectedWord;
let scrambledWord;
let attempts = 0;
let errors = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("random-word").addEventListener("click", nextGame);
    document.getElementById("reset").addEventListener("click", resetGame);
    generateRandomWord(); // Genera una palabra cuando se carga la página
});

function generateRandomWord() {
    // Selecciona una palabra aleatoria del array
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Desordena la palabra seleccionada
    scrambledWord = selectedWord.split('').sort(() => 0.5 - Math.random()).join('');
    
    // Muestra la palabra desordenada en el DOM
    document.getElementById("scrambled-word").textContent = scrambledWord;
    
    // Genera los campos de entrada para que el usuario ingrese la palabra original
    generateInputFields(selectedWord.length);
    
    // Restablece los contadores de intentos y errores
    attempts = 0;
    errors = 0;
    updateStatus();
}

function nextGenerateRandomWord() {
    // Selecciona una palabra aleatoria del array
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Desordena la palabra seleccionada
    scrambledWord = selectedWord.split('').sort(() => 0.5 - Math.random()).join('');
    
    // Muestra la palabra desordenada en el DOM
    document.getElementById("scrambled-word").textContent = scrambledWord;
    
    // Genera los campos de entrada para que el usuario ingrese la palabra original
    generateInputFields(selectedWord.length);

}

function generateInputFields(length) {
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = ""; // Limpia los campos de entrada anteriores

    // Crea un campo de entrada para cada letra
    for (let i = 0; i < length; i++) {
        const input = document.createElement("input");
        input.setAttribute("maxlength", "1");
        input.setAttribute("data-index", i); // Añade un atributo para identificar la posición
        input.addEventListener("input", checkInput);
        inputContainer.appendChild(input);
    }

    // Focaliza el primer campo de entrada
    inputContainer.querySelector("input").focus();
}

function checkInput(event) {
    const input = event.target;
    const index = input.getAttribute("data-index");
    const letter = input.value.toUpperCase();

    // Verifica si la letra ingresada es correcta en comparación con la palabra original
    if (letter === selectedWord[index]) {
        input.style.backgroundColor = "lightgreen";
        moveToNextInput(input);
    } else {
        if (letter != "" && input.value.length === 1) {
            errors++;
            input.style.backgroundColor = "lightcoral";
            updateStatus();
        } else {
            input.style.backgroundColor = "";
        }
    }

    if (errors >= 6) {      
        alert("Has perdido. ¡Inténtalo de nuevo!");
        resetGame();
    }

    const allFilled = Array.from(document.querySelectorAll("#input-container input")).every(input => input.value !== "");

    if (allFilled) {

        const allCorrect = Array.from(document.querySelectorAll("#input-container input")).every(input => input.style.backgroundColor === "lightgreen");

        if (allCorrect) {
                alert("🎉 Éxito");
                attempts++;
                updateStatus();
                nextGenerateRandomWord();
        } else if (errors >= 6) {      
                alert("Has perdido. ¡Inténtalo de nuevo!");
                resetGame();
        }
    }
}

function moveToNextInput(currentInput) {
    const nextInput = currentInput.nextElementSibling;
    if (nextInput) {
        nextInput.focus();
    }
}

function updateStatus() {
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("errors").textContent = errors;
}

function resetGame() {
    generateRandomWord(); // Genera una nueva palabra cuando se reinicia el juego
    errors = 0;
    attempts = 0;
    updateStatus();
}

function nextGame() {
    nextGenerateRandomWord(); // Genera una nueva palabra cuando se reinicia el juego
    errors++;
    updateStatus();
}

