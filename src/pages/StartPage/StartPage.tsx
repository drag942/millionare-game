import React from 'react';
import handSvg from '../../assets/hand.svg'
import styles from './StartPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {startGameAsyncAction} from "../../redux/gameReducer";
import {Redirect} from "react-router-dom";
import {getIsFinishGame, getIsStartedGame, getResult} from "../../redux/gameSelector";


const StartPage:React.FC = ():React.ReactElement => {

    const {isStartedGame, isFinishGame, result} = useSelector(state => ({
        isStartedGame: getIsStartedGame(state),
        isFinishGame: getIsFinishGame(state),
        result: getResult(state),
    }));
    const dispatch = useDispatch();

    if(isStartedGame) return <Redirect to={'/game'}/>;

    const onClickHandler = () => {
        dispatch(startGameAsyncAction());
    };

    const gameResult = result ? result : '0';

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <img className={styles.handImg} alt={'hand'} src={handSvg}/>
                </div>
                <div className={styles.rightSide}>
                    {isFinishGame && <p className={styles.subtitle}>Total score:</p>}
                    <h1 className={styles.title}>{ isFinishGame ? `$${gameResult} earned` : 'Who wants to be a millionaire?'}</h1>
                    <button onClick={onClickHandler} className={styles.btn} >{isFinishGame ? 'Try again' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;