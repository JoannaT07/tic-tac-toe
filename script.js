const cells = document.querySelectorAll('.cell');
const winningMsgArea = document.querySelector('.winning-message');
const winningMsgElement = document.querySelector('.result');
const restarBtn = document.querySelector('button');

let round = 1;
let fields = [];
export const FIELD = {
    EMPTY: 'EMPTY',
    CIRCLE: 'CIRCLE',
    CROSS: 'CROSS'
}
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

class GameResult {
    constructor(finished, winner) {
        this.finished = finished;
        this.winner = winner;
    }
}

export const prepareFields = () => {
    for(let i = 0; i < 9 ; i++) {
        fields[i] = FIELD.EMPTY;
    }
}

const getElementForField = (field) => {
    switch(field){
        case FIELD.CIRCLE:
            return `<i class="fa-solid fa-o"></i>`;
        case FIELD.CROSS:
            return `<i class="fa-solid fa-x"></i>`
    }
}

const startGame = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClicked)
        cell.classList.add('cell-hover')
})
}

const handleCellClicked = (cell) => {
    const field = round % 2 === 0 ? FIELD.CROSS : FIELD.CIRCLE;
    const { index } = cell.target.dataset;
    cell.target.innerHTML = getElementForField(field);
    fields[index] = field;
    cell.target.removeEventListener('click', handleCellClicked);
    cell.target.classList.remove('cell-hover');
    round++;
    endGame();
}

export const checkWinner = () => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++){
        const [indexA, indexB, indexC] = WINNING_COMBINATIONS[i];
        const valueA = fields[indexA];
        const valueB = fields[indexB];
        const valueC = fields[indexC];
        if (valueA === valueB && valueA === valueC && valueA !== FIELD.EMPTY){
            return new GameResult(true, valueA)
        }
    } 
    if (deadHeat()){
        return new GameResult(true)
    }
    return new GameResult(false);
}

const deadHeat = () => {
    return !fields.some(currentValue => currentValue === FIELD.EMPTY)
}

const endGame = () => {
    const gameResult = checkWinner();
    if(gameResult.finished){
        if(gameResult.winner){
            winningMsgElement.textContent = `The winner is ${gameResult.winner}!`;
        }else {
            winningMsgElement.textContent = `Dead-heat...`;
        }
        winningMsgArea.style.display = 'flex';
    }
}

const handleRestartBtnClick = () => {
    winningMsgArea.style.display = 'none';
    winningMsgElement.textContent = '';
    fields = []
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    prepareFields()
    startGame();
}

prepareFields();
startGame();
restarBtn.addEventListener('click', handleRestartBtnClick);