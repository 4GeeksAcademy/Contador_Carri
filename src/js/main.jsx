import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Variables globales
let seconds = 0;
let interval = null;
let isPaused = false;
let isCountdown = false;
let countdownStart = 0;
let targetAlert = null;

// Función para renderizar la interfaz
function renderApp() {
  root.render(
    <div className="text-center mt-5">
      <div className="bg-dark text-white p-4 rounded d-flex justify-content-center align-items-center fs-1">
        <i className="fas fa-clock me-3"></i>
        <span>{seconds.toString().padStart(6, "0")}</span>
      </div>

      <div className="mt-4">
        <button className="btn btn-warning mx-2" onClick={pauseCounter}>⏸️ Pausar</button>
        <button className="btn btn-success mx-2" onClick={resumeCounter}>▶️ Reanudar</button>
        <button className="btn btn-danger mx-2" onClick={resetCounter}>🔄 Reiniciar</button>
      </div>

      <div className="mt-4">
        <h5>Cuenta regresiva desde:</h5>
        <input id="countdownInput" type="number" className="form-control w-25 d-inline-block mx-2" placeholder="Segundos" />
        <button className="btn btn-primary" onClick={startCountdown}>⏬ Iniciar cuenta regresiva</button>
      </div>

      <div className="mt-4">
        <h5>Alerta al llegar a:</h5>
        <input id="targetAlertInput" type="number" className="form-control w-25 d-inline-block mx-2" placeholder="Ej: 10" onChange={setTargetAlert} />
      </div>
    </div>
  );
}

// Funciones de control
function startCounter() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!isPaused) {
      if (isCountdown) {
        seconds = Math.max(0, seconds - 1);
      } else {
        seconds += 1;
      }

      renderApp();

      // Verificar alerta
      if (targetAlert !== null && seconds === targetAlert) {
        alert(`⏰ ¡Has alcanzado el tiempo objetivo de ${targetAlert} segundos!`);
        targetAlert = null; // Evita que se dispare varias veces
      }
    }
  }, 1000);
}

function pauseCounter() {
  isPaused = true;
}

function resumeCounter() {
  isPaused = false;
}

function resetCounter() {
  seconds = 0;
  isPaused = false;
  isCountdown = false;
  targetAlert = null;
  renderApp();
}

function startCountdown() {
  const input = document.getElementById("countdownInput").value;
  const value = parseInt(input);
  if (!isNaN(value) && value > 0) {
    seconds = value;
    isCountdown = true;
    isPaused = false;
    renderApp();
  }
}

function setTargetAlert(event) {
  const value = parseInt(event.target.value);
  if (!isNaN(value) && value >= 0) {
    targetAlert = value;
  }
}

// Inicial
renderApp();
startCounter();

