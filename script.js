// Lista de pasos de baile
const steps = ["Giro", "Salto", "Pasos laterales", "Patada", "Ondulación", "Cruce de piernas"];
let sequence = []; // Secuencia generada por el juego
let playerSequence = []; // Secuencia ingresada por el jugador
let playerTurn = false;

// Elementos del DOM
const startButton = document.getElementById("start-button");
const confirmButton = document.getElementById("confirm-button");
const sequenceElement = document.getElementById("sequence");
const resultElement = document.getElementById("result");
const stepButtonsContainer = document.getElementById("step-buttons");

// Crear botones dinámicamente
function createStepButtons() {
  steps.forEach(step => {
    const button = document.createElement("button");
    button.textContent = step;
    button.addEventListener("click", () => handleStepClick(step));
    stepButtonsContainer.appendChild(button);
  });
}

// Función para manejar clics en los botones de pasos
function handleStepClick(step) {
  if (playerTurn) {
    playerSequence.push(step);
    resultElement.textContent = `Secuencia actual: ${playerSequence.join(", ")}`;
  }
}

// Función para generar un paso aleatorio
function generateStep() {
  return steps[Math.floor(Math.random() * steps.length)];
}

// Función para mostrar la secuencia del juego
function displaySequence() {
  sequenceElement.textContent = `Secuencia: ${sequence.join(", ")}`;
}

// Función para iniciar el juego
function startGame() {
  sequence = [];
  playerSequence = [];
  playerTurn = false;
  resultElement.textContent = "";
  confirmButton.disabled = false;
  addStep(); // Agrega el primer paso
}

// Función para agregar un paso a la secuencia
function addStep() {
  const newStep = generateStep();
  sequence.push(newStep);
  displaySequence();
  playerSequence = []; // Limpia la secuencia del jugador
  playerTurn = true; // Activa el turno del jugador
}

// Función para verificar la secuencia del jugador
function checkPlayerSequence() {
  if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
    resultElement.textContent = "¡Correcto! Agregando un nuevo paso...";
    playerTurn = false;
    setTimeout(() => addStep(), 1000); // Agrega un nuevo paso después de 1 segundo
  } else {
    resultElement.textContent = "¡Incorrecto! Fin del juego.";
    playerTurn = false;
    confirmButton.disabled = true; // Desactiva el botón confirmar
  }
}

// Event listeners
startButton.addEventListener("click", startGame);
confirmButton.addEventListener("click", () => {
  if (playerTurn) {
    checkPlayerSequence();
  }
});

// Crear botones al cargar la página
createStepButtons();
