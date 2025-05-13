const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.ignore === "true") return;

    if (button.textContent === '=') {
      try {
        display.value = eval(display.value);
        agregarAlHistorial(display.value, resultado);
      } catch {
        display.value = 'Error';
      }
    }
    else if (button.textContent === 'C') {
      display.value = '';
    }
    else if (button.textContent === '←') {
      display.value = display.value.slice(0, -1);
    }
    else {
      display.value += button.textContent;
    }
  });
});

/*-----Telado-------*/

document.addEventListener('keydown', (e)=>{
    const tecla = e.key

    if (tecla === 'Enter') {
      try {
        display.value = eval(display.value);
        agregarAlHistorial(display.value, resultado);
      } catch {
        display.value = 'Error';
      }
    }
    if (tecla === 'Backspace'){
        display.value = display.value.slice(0,-1)

    } 
    if (tecla === 'Escape') {
        display.value = ''

    } 
    if ('0123456789+-*/.'.includes(tecla)){
        display.value += tecla

    } 
    if(tecla === '(' || tecla === ')') {
        display.value += tecla;
    }
})


/*------Modo Claro y Oscuro------*/


const toggleModeBtn = document.getElementById("toggle-mode")


toggleModeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("white-mode")
  
  toggleModeBtn.textContent = document.body.classList.contains("white-mode") ? "🌙" : "☀️";

})

/*-----Historial-------*/

const toggleHistoryBtn = document.getElementById("toggle-history")
const historyPanel = document.getElementById("history-panel")
const HistoryList = document.getElementById("history-list")

let history = []

toggleHistoryBtn.addEventListener("click", () =>{
  historyPanel.classList.toggle("hidden")
    toggleHistoryBtn.textContent = historyPanel.classList.contains("hidden") ? "❌" : "📱"

})

function agregarAlHistorial(operacion,operacion){
  const entrada = `${operacion} = ${resultado}`
  history.unshift(entrada); // Añade al principio
  if (history.length > 10) history.pop(); // Solo 10 elementos

  renderizarHistorial();
}

function renderizarHistorial() {
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}