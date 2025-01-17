// Lista de pasos de baile (pool de palabras)
const stepsPool = [
  "CyC", "Daniel y Alma", "CyC", "CyT Sensual", "JyE", "EyG", "DyY", "MARCO ESPEJO", "CYC", "JHERSY - Molino",
  "JHERSY - Preparar pos Cerrada", "Sergio y Katina", "EyG", "Alberto y María (Cats)", "YyE", "JHERSY (preparo sensual + mano Follow)",
  "JHERSY (preparo sensual + lanzo en 4 y salgo)", "DIAGONAL salida", "AyV", "CyC", "Sergio y Katina", "Sensual +", "Gto y M",
  "José y Layla (Mym)", "INTRO", "K_ELDE", "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "Iván y Sarai", "TONIO (cambio posición mano hombro)"
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
    button.classList.add("step-button"); // Añade clase para estilo
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
