import React from 'react';
import classnames from "classnames";
import styles from "./Answers.module.css";

interface AnswersProps {
    answers: {
        variant: string,
        body: string,
        isRight: boolean,
    }[

    ],
    onAnswerClick: (answer: string) => void,
    selected: string | null,
    showAnswers: boolean,
    disabled: boolean,
}

const Answers:React.FC<AnswersProps> = ({answers, onAnswerClick, selected, showAnswers, disabled}) => {

    return (
        <div className={styles.answers}>
            {answers.map((answer:any) => {
                return <div key={answer.variant} className={styles.item}><button
                    className={classnames( {
                        [styles.btn]: true,
                        [styles.selectedBtn]: selected === answer.variant,
                        [styles.successBtn]: showAnswers && answer.isRight,
                        [styles.errorBtn]: showAnswers && !answer.isRight,
                    })}
                    key={answer.body}
                    onClick={() => onAnswerClick(answer)}
                    disabled={disabled}
                >
                    <span className={styles.variant}>{answer.variant}</span>
                    {' ' + answer.body}
                    <div className={styles.line}/>
                </button></div>
            })}
        </div>
    );
};

export default Answers;