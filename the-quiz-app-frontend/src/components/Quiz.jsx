import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

function Quiz() {
    const [timer, setTimer] = useState(10)
    const [quizEnds, setQuizEnds] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [ques, setQues] = useState([])
    const [quizID, setQuizID] = useState('')
    const [quizData, setQuizData] = useState([])
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    // const isLogged = true

    useEffect(() => {
        setQuizID(uuidv4())
        axios.get('http://localhost:5000/questions/')
        .then((response) => {
            var questions = response.data.questions;
            console.log(questions)
            setQues(questions)
        })
        .catch((error) => {
			console.log(error)
		});
    }, [])

    useEffect(() => {
        if(!quizEnds) {
            const timerFunction = setTimeout(time, 1000)
            return function cleanup() {
                clearTimeout(timerFunction);
            }
        }
    })

    const time = () => {
        if(timer == 0) {
            var correctAnswer;
            ques[currentQuestion].answerOptions.map(q => {
                if(q.isCorrect) {
                    correctAnswer = q.answerText
                }
            })
            const question = {
                question: ques[currentQuestion].questionText,
                correctAns: correctAnswer,
                yourAns: 'NOT ATTEMPTED!'
            }
            setQuizData([...quizData, question])
            if((currentQuestion+1 == ques.length)) {
                const data = {
                    userID: isLogged.payload[0]._id,
                    quizID: quizID,
                    quizData: quizData,
                    score: score
                }
                console.log('Timer Quiz Ends')
                axios.post('http://localhost:5000/quiz/quizdata', data)
                .then(result => {
                    console.log('Data Submitted!')
                })
                .catch((error) => {
                    console.log(error)
                });
                setQuizEnds(true)
                return;
            }
            if(!quizEnds) setTimer(10)
			setCurrentQuestion(currentQuestion + 1);
            return
        }
        setTimer(timer - 1)
    }

    const SignOut = () => {
        console.log('Sign Out')
        dispatch(SIGN_OUT())
    }

    const handleAnswerOptionClick = (isCorrect, yourAnswer) => {
		if (isCorrect) {
			setScore(score + timer);
		}
        var correctAnswer;
        ques[currentQuestion].answerOptions.map(q => {
            if(q.isCorrect) {
                correctAnswer = q.answerText
            }
        })
        const question = {
            question: ques[currentQuestion].questionText,
            correctAns: correctAnswer,
            yourAns: yourAnswer
        }
        setQuizData([...quizData, question])
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < ques.length) {
            setTimer(10)
			setCurrentQuestion(nextQuestion);
		} else {
            const data = {
                userID: isLogged.payload[0]._id,
                quizID: quizID,
                quizData: quizData,
                score: score
            }
            axios.post('http://localhost:5000/quiz/quizdata', data)
            .then(result => {
                console.log('Data Submitted!')
            })
            .catch((error) => {
                console.log(error)
            });
            console.log(quizData)
            setQuizEnds(true)
            console.log('Quiz Ends')
		}
    };

	return (
		<div className="Quiz">
			{
                quizEnds ? 
                <>
                    <h1>Quiz Ends!</h1>
                    <h6><b>Your Quiz ID: </b>{quizID}</h6>
                    <h1><b>Score</b>: {score}</h1>
                    
                    <Link to="/"><button className="btn btn-primary" style={{marginBottom: '1rem'}}>Retake Quiz</button></Link>
                    <Link to="/pastscore"><button className="btn btn-primary" style={{marginBottom: '1rem'}}>View Previous Score</button></Link>
                    <Link to="/"><button className="btn btn-primary" style={{marginBottom: '1rem'}} onClick={() => SignOut()}>Logout</button></Link>
                </>
                :
                isLogged ? 
                <>
                    <div className="questions__box container">
                        <div className="head">
                            <div className="questionNum">
                                Question: {currentQuestion + 1} / 10
                            </div>
                            <div className="timer">
                                Time Left: {timer}
                            </div>
                        </div>
                        <div className="timer">
                            Score: {score}
                        </div>
                        <hr></hr>
                        <div className="question">
                            {ques.length > 1 ? ques[currentQuestion].questionText : <>Loading</> }
                        </div>
                        <hr></hr>
                        <div className="row">
                            {
                                ques.length > 1 ? 
                                ques[currentQuestion].answerOptions.map((answerOption) => (
                                    <div className="col-md-6" style={{marginBottom: '1rem'}}>
                                        <button className="btn btn-primary" onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>{answerOption.answerText}</button>
                                    </div>
                                ))
                                :
                                <>
                                Loading
                                </>
                            }
                        </div>
                    </div>
                </>
                : <Redirect to='/login' />
            }
		</div>
	);
}

export default Quiz;
