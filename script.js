// Lista de pasos de baile (pool de palabras)
const stepsPool = [
  "CyC (Host cambio posición)", "Daniel y Alma", "CyC (Host círculo Dcha)", "CyT Sensual", "JyE (diagonal Cintura)", "EyG (abro  y cierro)", "DyY (abro en 4)", "MARCO ESPEJO", "CYC (lanzo atrás en 3)", "JHERSY - Molino",
  "JHERSY - Preparar pos Cerrada", "Sergio y Katina (Bassmnt)", "EyG (Cats giro 2 manos)", "Alberto y María (Cats)", "YyE", "JHERSY (preparo sensual + mano Follow)",
  "JHERSY (preparo sensual + lanzo en 4 y salgo)", "DIAGONAL salida", "AyV", "CyC (Segovia)", "Sergio y Katina (Host)", "Sensual +", "Gto y M",
  "José y Layla (Mymo)", "INTRO Carlos", "INTRO Carlos","INTRO Carlos", "K_ELDE Intro", "K_ELDE mano en 5",  "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "Iván y Sarai", 
  "TONIO (cambio posición mano hombro)", "K_ELDE brazos Izq", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "K_ELDE brazos Dcha", 
  "Iván y Sarai", "TONIO (cambio posición mano hombro)", "JHERSY (salir/end)", "CyC", "Tonio (Codos / Angel / Andar)", "70'", "Yowke", "Pasitos Elw Adelante/Atrás", "Pasitos Elw Izq/Dcha", "Cambio posición con mano Izq (Marc/Sra)", "Daniel y Alma", 
  "Francia", "Alex y Lais (jóvenes -3+1)", "VyA", "DyY", "JyE", "CyC", "70'", "CyC", "M y Gta", "DyY", "DyY", "ENGAÑO", "PyL", "Yowke", "DyY", "ENGAÑO", "MOLINO juego", "TONIO (enrrollo + saco/peinado)", "SENSUAL Lados", "PATADA", "MATI y SOFI", 
  "MOLINO insta", "EyG", "TyC", "CyC", "GOLPE Elw", "JyE", "INTRO", "EyG", "VALENT", "VyA", "FLECHA", "CyC", "CyC", "CyC", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "CyT", "EyG", "BRAZOS frame", "JOVENES 70'+ Cuello", "5 cintura abajo", 
  "David", "CyT sens", "CyT sens", "DISOCIACION de PECHO (Enrollada)", "EyG", "CyC", "GAB", "CyC", "CyT", "KENZ y JULY Lanzo brazo atrás", "JyE", "Básico + Salto", "CyC", "EyG", "Pablo y Nat (jóvenes)", "Otto", "CyC", "ASCENSOR", "JLAB", 
  "JAVI y BELÉN", "JORGE y SANDRA", "JyE", "COLOMBIAN", "DISOCIACION de PECHO (en SOMBRA)" , "CyC", "GIRO 70 Cambio Posición CyT", "GIRO ATRÁS ONDA CyC", "CyC", "CyC", "JLAB", "CyC", "YEIFREN", "CyC", "DyY", "SENSUAL +", "DyY", "70´Adelante", 
  "JyE", "A y Yur", "Lado MAMBO", "GAB", "JyE Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "D e Inés", "INTRO", "CyT", "Brazo Lanzo DEBAJO", "JLAB", "DOTORE (Mym)", "ARGETIN", "CANGURO", "PyL Pasos", "ENGAÑO", "CyC", "JyE", "GUITARRA", 
  "SINCOPADO", "Pasos CARLOS"
];

// Pasos seleccionados para la partida (solo 5)
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

// Selecciona aleatoriamente 5 pasos de la pool
function selectSteps() {
  steps = [];
  const poolCopy = [...stepsPool];
  for (let i = 0; i < 5; i++) {
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
  selectSteps(); // Selecciona los 5 pasos para esta partida
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
