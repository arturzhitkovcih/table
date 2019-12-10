const btn = document.getElementById("btn");
const cellArray = Array.from(document.getElementsByClassName('cell'));
let timeoutPrint;
let timeoutRemove;
let sum = 0;
let isStarted = false;
let clearCellArray = 0;

printSum();
getClearCell();
setListener();
clearAllCell();

function clearAllCell () {
    cellArray.forEach(item => {
        removeCell(item)
    })
}

function setListener() {
    clearCellArray.forEach(item => {
        item.addEventListener('click', () => {
            removeCell(item, true);
        })
    });
}

function removeCell(cell, fold = false) {

    if (fold) {
        let number = parseInt(cell.textContent) | 0;

        sum += number;
        printSum();
    }
    cell.classList.remove('fill');
    cell.textContent = "";

    getClearCell();
}

function addCell() {
    let randCell = getRandomNumber(0,clearCellArray.length - 1);
    let cell = clearCellArray[randCell];

    cell.classList.add('fill');
    cell.innerText = getRandomNumber(1,99);

    timeoutRemove = setTimeout( () => {removeCell(cell)}, 3000);

    getClearCell();
}

function getRandomNumber(min, max) {
    return Math.round( min - 0.5 + Math.random() * (max - min + 1));
}

function getClearCell() {
    clearCellArray = cellArray.filter(item => !item.textContent)
}

function printSum() {
    const sumField = document.getElementById('sum');

    sumField.innerText = sum;
}

function generateCell() {

    if (clearCellArray.length && isStarted) {
        timeoutPrint = setTimeout( generateCell, 2000);
        addCell();
    }
}

function start() {

    isStarted = !isStarted;

    if (isStarted) {
        btn.textContent = "Pause";
        generateCell();
    } else {
        btn.textContent = "Start";
        clearAllCell();
        clearInterval(timeoutRemove);
        clearInterval(timeoutPrint);
    }
}






