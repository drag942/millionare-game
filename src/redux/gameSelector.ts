export const getIsStartedGame = (state:any) => {
    return state.gameReducer.isStartedGame;
};

export const getQuestions = (state: any) => {
    return state.gameReducer.questions;
};

export const getSelectedQuestion = (state:any) => {
    return state.gameReducer.selectedQuestion;
};

export const getMenu = (state:any) => {
    return state.gameReducer.menu;
};

export const getIsFinishGame = (state: any) => {
    return state.gameReducer.isFinishGame;
};

export const getResult = (state: any) => {
    return state.gameReducer.result;
};