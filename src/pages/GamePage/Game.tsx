import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIsStartedGame, getMenu, getQuestions, getSelectedQuestion} from "../../redux/gameSelector";
import { Redirect } from 'react-router-dom';
import {finishGameAsyncAction, setNextQuestion} from "../../redux/gameReducer";
import styles from './Game.module.css'
import Menu from "./Menu/Menu";
import HamburgerMenu from 'react-hamburger-menu';
import Answers from "./Aswers/Answers";
import {useWindowSize} from "../../hooks/useWindowSize";

interface Question {
    question: string | undefined,
    answers: {variant: string, isRight: boolean, body: string}[]
}

const Game:React.FC = ():React.ReactElement => {

    const {questions, selectedQuestion, isStartedGame, menu} = useSelector(state =>
        ({
            questions: getQuestions(state),
            selectedQuestion: getSelectedQuestion(state),
            isStartedGame: getIsStartedGame(state),
            menu: getMenu(state)
        })
    );


    const dispatch = useDispatch();
    const [selected, setSelected] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const windowSize = useWindowSize();
    
    useEffect(() => {
       if (windowSize.width > 767 && showMobileMenu) {
          setShowMobileMenu(false)
       } 
    }, [showMobileMenu, windowSize]);

    const isLastQuestion = selectedQuestion === menu[menu.length - 1];

    const onAnswerClickHandler = (answer:any) => {
        setDisabled(true);
        setSelected(answer.variant);
        setTimeout(() => {
            setShowAnswers(true);
            setSelected(null);
            setTimeout(() => {
                if (answer.isRight) {
                    if (isLastQuestion) {
                        dispatch(finishGameAsyncAction(selectedQuestion))
                    } else {
                        dispatch(setNextQuestion());
                    }
                } else {
                    dispatch(finishGameAsyncAction(menu[menu.indexOf(selectedQuestion) - 1]))
                }
                setShowAnswers(false);
                setDisabled(false);
            }, 1000);
        }, 1000);
    };

    if (!isStartedGame) return <Redirect to={'/'}/>;

    let question:Question = {question: '', answers:[]};

    for(let key in questions) {
        if (key === selectedQuestion){
            if(questions.hasOwnProperty(key))
            question = questions[key];
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mobileMenuHamburger}>
                <HamburgerMenu
                    isOpen={showMobileMenu}
                    menuClicked={()=>{setShowMobileMenu(!showMobileMenu)}}
                    width={18}
                    height={15}
                    strokeWidth={3}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </div>
            {!showMobileMenu ? <div className={styles.leftSide}>
                <p className={styles.question}>{question.question}</p>
                <Answers
                    answers={question.answers}
                    onAnswerClick={onAnswerClickHandler}
                    selected={selected}
                    showAnswers={showAnswers}
                    disabled={disabled}
                />
            </div> : <div className={styles.mobileMenu}>
                    <Menu menu={menu} selectedQuestion={selectedQuestion}/>
            </div>}
            <div className={styles.rightSide}>
                <Menu menu={menu} selectedQuestion={selectedQuestion}/>
            </div>
        </div>
    );
};

export default Game;