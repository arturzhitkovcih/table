let state = {
    countColumn: 3,
    countRow: 3,
    gameStatus: false,
    cellsArray: [],
    clearCellsArray: [],
    cellsForRemove: [],
    sum: 0,
    timeAfterLaunch: 0
};

let timer = 0;

function start() {
    let { gameStatus } = state;

    gameStatus = !gameStatus;

    if (gameStatus) {
        launch();
        button.innerText = "Pause";
    } else {
        clearTimeout(timer)
        button.innerText = "Resume";
    }

    setState({
        gameStatus
    })
    
}

function launch() {
    let { gameStatus, timeAfterLaunch } = state;

    getClearCell();

    if ( gameStatus ) {
        const secondsPassed = (timeAfterLaunch / 1000);
        const add = secondsPassed % 2;
        const remove = secondsPassed % 3;

        switch (add === remove && secondsPassed > 0) {
            case true:
                if (remove === 0 && timeAfterLaunch > 1000) {
                    removeCell();
                }
                if (add == 0) {
                    fillCell();
                }
                break;
            case false:
                if (add == 0) {
                    fillCell();
                } else if (remove === 0 && timeAfterLaunch > 1000) {
                    removeCell();
                } break;
        }

        timeAfterLaunch += 50;
        setState({
            timeAfterLaunch
        });
    }
    console.log(timeAfterLaunch)

    timer = setTimeout(launch, 50);
}

function getRandomNumber(min, max) {
    return Math.round( min - 0.5 + Math.random() * (max - min + 1));
}

function renderTable (countColumn, countRow) {
    const countCell = countColumn * countRow;
    const table = document.createElement("div");
    let widthTable = 40 * countColumn;
    table.classList.add("table");
    table.style.width = `${widthTable}px`;
    table.id = "table";

    for (let i = 0; i < countCell; i++ ){
        const cell = document.createElement("div");

        cell.classList.add(`cell`);
        table.appendChild(cell);
    }

    return table;
}

function printSum() {
    const { sum } = state;


    return `Total sum : ${ sum }`;
}

function render() {
    const title = "Game by Artur";
    const titleElement = document.createElement('h1');
    const sumTitle = document.createElement('h2');
    const button = document.createElement('button');
    const game = document.createElement('div');
    let { countColumn, countRow, cellsArray, clearCellsArray } = state;
    const table = renderTable( countColumn, countRow);

    sumTitle.innerText = printSum();
    sumTitle.id = "sumTitle";
    titleElement.innerText = title;
    button.innerText = "Start";
    button.id = "button";

    cellsArray = Array.from(table.childNodes);
    clearCellsArray = cellsArray;

    setState({
        cellsArray,
        clearCellsArray
    });
    game.appendChild(titleElement);
    game.appendChild(sumTitle);
    game.appendChild(table);
    game.appendChild(button);

    return game;
}

document.body.appendChild(render());

function setState(obj) {

    Object.keys(obj).map((item) => {
        state[item] = obj[item]
    });

}

const button = document.getElementById('button');
const table = document.getElementById('table');

table.addEventListener('click', (event) => {
    const cell = event.target;
    const number = parseInt(cell.innerText) | 0;
    let { sum, gameStatus } = state;
    if (number && gameStatus ) {
        const sumTitle = document.getElementById('sumTitle');
        sum += number;

        cell.classList.remove('fill');
        cell.textContent = "";
        setState({
            sum
        });

        sumTitle.innerText = printSum();
        getClearCell();
    }
});

button.addEventListener('click', () => {
    start();
    getClearCell();
});

function getClearCell() {
    let { cellsArray } = state;

    const clearCellsArray = cellsArray.filter(item => !item.textContent);

    setState({
        clearCellsArray
    });
}

function fillCell() {
    let { clearCellsArray, cellsForRemove, gameStatus } = state;
    if (clearCellsArray.length > 0) {
        const randomCell = getRandomNumber(0, clearCellsArray.length - 1);
        const cell = clearCellsArray[randomCell];

        cellsForRemove.push(cell);
        cell.classList.add('fill');
        cell.innerText = getRandomNumber(1,99);

        setState({
            cellsForRemove
        });
        getClearCell();

    } else {
        gameStatus = false
        setState({
            gameStatus
        });
        alert("Game over(((")
    }


}

function removeCell() {
    let { cellsForRemove } = state;
    const cell = cellsForRemove[0];

    cell.classList.remove('fill');
    cell.textContent = "";
    getClearCell();

    cellsForRemove.shift();

    setState({
        cellsForRemove
    });
    // if (fold) {
    //     const number = parseInt(cell.textContent) | 0;
    //
    //     sum += number;
    //     printSum();
    // }
    //
    // cell.classList.remove('fill');
    // cell.textContent = "";
    // getClearCell();
}







