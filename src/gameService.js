export const FIELD = {
    EMPTY: 'EMPTY',
    CIRCLE: 'CIRCLE',
    CROSS: 'CROSS'
}

export let fields = [];
export const WINNING_COMBINATIONS = [
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

export const clearFields = () => {
    fields = []
}

export const setFields = (newFields) =>{
    fields = newFields;
}

export const checkGameResult = () => {
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
