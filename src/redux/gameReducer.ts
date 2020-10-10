import {Dispatch} from "redux";
import {getQuestions} from "../api/api";

const initialState = {
    questions: [],
    selectedQuestion: 0,
    result: 0,
    isStartedGame: false,
    isFinishGame: false,
    menu:[],
};


const SET_START_GAME = 'gameReducer/SET_START_GAME';
const SET__QUESTIONS = 'gameReducer/SET_QUESTIONS';
const SET_SELECTED_QUESTION = 'gameReducer/SET_SELECTED_QUESTION';
const SET_RESULT = 'gameReducer/SET_RESULT';
const SET_FINISH_GAME = 'gameReducer/SET_FINISH_GAME';
const SET_MENU = 'gameReducer/SET_MENU';
const SET_NEXT_QUESTION = 'gameReducer/SET_NEXT_QUESTION';


const gameReducer = (state = initialState, action:any) => {
    switch (action.type) {

        case SET_START_GAME: {
            return {
                ...state,
                isStartedGame: action.payload,
            }
        }

        case SET__QUESTIONS: {
            return {
                ...state,
                questions: action.payload,
            }
        }

        case SET_SELECTED_QUESTION: {
            return {
                ...state,
                selectedQuestion: action.payload,
            }
        }
        case SET_RESULT: {
            return {
                ...state,
                result: action.payload,
            }
        }
        case SET_FINISH_GAME: {
            return {
                ...state,
                isFinishGame: action.payload,
            }
        }

        case SET_MENU: {
            return {
                ...state,
                menu: action.payload,
            }
        }

        case SET_NEXT_QUESTION: {

            return {
                ...state,
                // @ts-ignore
                selectedQuestion: state.menu[state.menu.indexOf(state.selectedQuestion) + 1],
             }
        }

        default: return state;
    }
};


const setStartGame = (payload:boolean) => ({
    type: SET_START_GAME,
    payload,
});

const setQuestions = (payload: []) => ({
    type: SET__QUESTIONS,
    payload,
});

const setSelectedQuestion = (payload:string) => ({
    type: SET_SELECTED_QUESTION,
    payload,
});

const setMenu = (payload:string[]) => ({
    type: SET_MENU,
    payload,
});

export const setNextQuestion = () => ({
    type: SET_NEXT_QUESTION,
});

const setResult  = (payload: string) => ({
    type: SET_RESULT,
    payload,
});

const setFinishGame = (payload: boolean) => ({
    type: SET_FINISH_GAME,
    payload,
});




export const startGameAsyncAction = () => {
    return async (dispatch: Dispatch) => {
        const request = await getQuestions();

        let questions:any = {};

        for ( let key in request.questions) {
            if (request.questions.hasOwnProperty(key))
            questions[key] = request.questions[key][Math.floor(Math.random()*request.questions[key].length)]
        }

        dispatch(setQuestions(questions));
        dispatch(setMenu(Object.keys(questions)));
        dispatch(setSelectedQuestion(Object.keys(questions)[0]));
        dispatch(setStartGame(true));
        dispatch(setFinishGame(false));
    }
};

export const finishGameAsyncAction = (result: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setResult(result));
        dispatch(setStartGame(false));
        dispatch(setFinishGame(true));
    }
};


export default gameReducer;