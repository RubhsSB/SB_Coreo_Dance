// Lista de pasos de baile (pool de palabras)
const stepsPool = [
  "Giro", "Salto", "Pasos laterales", "Patada", "Ondulación", 
  "Cruce de piernas", "Paso doble", "Desplante", "Tacón", 
  "Rodilla arriba", "Vuelta completa", "Balanceo", "Sincopado", 
  "Estocada", "Corte lateral", "Desplazamiento"
];

// Pasos seleccionados para la partida (solo 10)
let steps = [];
let sequence = []; // Secuencia generada por el juego
let playerSequence = []; // Secuencia ingresada por el jugador
let playerTurn = false;

// Elementos del DOM
const startButton = document.getElementById("start-button");
const confirmButton = document.getElementById("confirm-button");
const sequenceElement = document.getElementById("sequence");
const resultElement = document.getElementById("result");
const stepButtonsContainer = document.getElementById("step-buttons");

// Selecciona aleatoriamente 10 pasos de la pool
function selectSteps() {
  steps = [];
  const poolCopy = [...stepsPool];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    steps.push(poolCopy.splice(randomIndex, 1)[0]);
  }
}

// Crear botones dinámicamente
function createStepButtons() {
  stepButtonsContainer.innerHTML = ""; // Limpia los botones anteriores
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
  selectSteps(); // Selecciona los 10 pasos para esta partida
  createStepButtons(); // Crea botones con los pasos seleccionados
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

// F
