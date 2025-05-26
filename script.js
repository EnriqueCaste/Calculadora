/*-------Calculadora-------*/

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

/*-----Raton-------*/

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.ignore === "true") return;

    if (button.textContent === '=') {
        if (display.value === 'Error' || display.value === "") return;

      try {
        const operacion = display.value;
        const resultado = math.evaluate(operacion);
        display.value = resultado;
        agregarAlHistorial(operacion, resultado);

      } catch (err) {
          display.value = 'Error';
          console.error("Error en la operación:", err);
      }
    }
    else if (button.textContent === 'C') {
      display.value = '';
    }
    else if (button.textContent === '←') {
      display.value = display.value.slice(0, -1);
    }
    else {
      let val = button.textContent;
      const funcionesCientificas = {
        'sin': 'sin(',
        'cos': 'cos(',
        'tan': 'tan(',
        'log': 'log10(',
        'ln': 'log(',
        'e^x': 'exp(',
        'π': 'pi',
        'e': 'e',
        'x²': '^2',
        '√x': 'sqrt(',
        '1/x': '1/(',
        '|x|': 'abs(',
        '!': '!',
        'x^y': '^'
      };

      if (funcionesCientificas[val]) {
        display.value += funcionesCientificas[val];
      } else {
        display.value += val;
      }
    }
  });
});

/*-----Telado-------*/

document.addEventListener('keydown', (e)=>{
    const tecla = e.key

    if (tecla === 'Enter') {
      e.preventDefault();

      if (display.value === 'Error' || display.value === "") return;

      try {
        const operacion = display.value;
        const resultado = math.evaluate(operacion);
        display.value = resultado;
        agregarAlHistorial(operacion, resultado);

      } catch (err) {
          display.value = 'Error';
          console.error("Error en la operación:", err);
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


/*-------Historial-------*/

/*--Boton Borrar Historial--*/

const cleanHistoryBtn = document.getElementById("clear-history")

cleanHistoryBtn.addEventListener("click", () =>{
  history = [];
  localStorage.removeItem('calculatorHistory');
  renderizarHistorial();
})

/*--Agregar Al Historial--*/

function agregarAlHistorial(operacion, resultado) {
  const entrada = `${operacion} = ${resultado}`;

  if(history.length > 0 && history[0] === entrada) return;
  history.unshift(entrada); 

  if (history.length > 10) history.pop();

  localStorage.setItem("calculatorHistory", JSON.stringify(history));
  renderizarHistorial();
}

/*--Memoria Historial--*/

const historyList = document.getElementById("history-list")
let history = []

function renderizarHistorial() {
  historyList.innerHTML = "";

  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

const historialGuardado = localStorage.getItem("calculatorHistory");

if (historialGuardado) {
  history = JSON.parse(historialGuardado);
  renderizarHistorial();
}


/*-------SideBar-------*/

/*------Boton Theme------*/

const toggleModeBtn = document.getElementById("toggle-theme")

toggleModeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("white-mode")
  toggleModeBtn.textContent = document.body.classList.contains("white-mode") ? "Oscuro" : "Claro";
})

/*------Boton Cientifico------*/

const toggleScientificBtn = document.getElementById("toggle-Panel");
const scientificPanel = document.getElementById("panel");

toggleScientificBtn.addEventListener("click", () => {
  scientificPanel.classList.toggle("panel-hidden"); 
  toggleScientificBtn.textContent = scientificPanel.classList.contains("panel-hidden") ? "Cientifica" : "Basica";
});

/*--Boton Historial--*/

const toggleHistoryBtn = document.getElementById("toggle-history")
const historyPanel = document.getElementById("history")

toggleHistoryBtn.addEventListener("click", () => {
  historyPanel.classList.toggle("history-hidden");
  toggleHistoryBtn.textContent = historyPanel.classList.contains("history-hidden") ? "Mostrar" : "Ocultar";
});

