import { FIELD, fields, prepareFields, clearFields, checkGameResult } from "./gameService.js";

const cells = document.querySelectorAll('.cell');
const winningMsgArea = document.querySelector('.winning-message');
const winningMsgElement = document.querySelector('.result');
const restarBtn = document.querySelector('button');
let round = 1;

const getElementForField = (field) => {
    switch(field){
        case FIELD.CIRCLE:
            return `<i class="fa-solid fa-o"></i>`;
        case FIELD.CROSS:
            return `<i class="fa-solid fa-x"></i>`
    }
}

const startGame = () => {
    console.log("start gane")
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

const endGame = () => {
    const {finished, winner} = checkGameResult();
    if(finished){
        if(winner){
            winningMsgElement.textContent = `The winner is ${winner}!`;
        }else {
            winningMsgElement.textContent = `Dead-heat...`;
        }
        restarBtn.addEventListener('click', handleRestartBtnClick);
        winningMsgArea.style.display = 'flex';
    }
}

const handleRestartBtnClick = () => {
    winningMsgArea.style.display = 'none';
    winningMsgElement.textContent = '';
    clearFields();
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    prepareFields()
    startGame();
}

prepareFields();
startGame();