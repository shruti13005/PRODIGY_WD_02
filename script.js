let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        lapsContainer.appendChild(lapTime);
    }
}
