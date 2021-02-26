import React, { useEffect, useState } from 'react'
import './PastQuizScore.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

function PastQuizScore(props) {
    const [modalShow, setModalShow] = useState(false);
    const [indQuizData, setIndQuizData] = useState([]);
    const [indScore, setIndScore] = useState(0);
    const [quiz, setQuiz] = useState('')
    const [pastScore, setPastScore] = useState([])
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    // const isLogged = true

    useEffect(() => {
        // ${isLogged.payload[0]._id}
        axios.get(`http://localhost:5000/quiz/${isLogged.payload[0]._id}`)
        .then((response) => {
            var data = response.data.quiz;
            setPastScore(data)
            console.log(data)
        })
        .catch((error) => {
			console.log(error)
		});
    }, [])

    const SignOut = () => {
        console.log('Sign Out')
        dispatch(SIGN_OUT())
    }

    function MyVerticallyCenteredModal(props) {
        const getData = () => {
            pastScore.forEach(ele => {
                if(ele.quizID == quiz) {
                    setIndScore(ele.score)
                    setIndQuizData(ele.quizData)
                }
            })
        }
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              {getData()}
            <Modal.Header closeButton>
                Quiz ID: {quiz}<br></br>
                Your Score: {indScore}
            </Modal.Header>
            <Modal.Body>
                <table border="1">
                    <thead>
                        <td>Questions</td>
                        <td>Your Answer</td>
                        <td>Correct Answer</td>
                    </thead>
                {
                    indQuizData.map(ele => {
                        return (
                        <tr>
                            <td>{ele.question}</td>
                            <td>{ele.correctAns}</td>
                            <td>{ele.yourAns}</td>
                        </tr>
                        )
                    })
                }
                </table>
            </Modal.Body>
          </Modal>
        );
    }
      
    const handleQuiz = (quiz) => {
        setQuiz(quiz)
        setModalShow(true)
    }

	return (
		<div className="PastQuizScore">
			{
                isLogged ? 
                <>
                    <div className="flex">
                        <Link to="/"><button className="btn btn-primary">Home</button></Link>
                        <Link to="/"><button className="btn btn-primary" onClick={() => SignOut()}>Logout</button></Link>
                    </div>
                    Hey, {isLogged.payload[0].firstName}<br></br>
                    Your Acc ID: {isLogged.payload[0]._id}<br></br><br></br>
                    <table border="1">
                        <thead>
                            <td>Quiz ID</td>
                            <td>Score</td>
                            <td>Create Date</td>
                            <td>Details</td>
                        </thead>
                        <tbody>
                        {
                            pastScore.map(ele => {
                                return (
                                    <tr>
                                        <td>{ele.quizID}</td>
                                        <td>{ele.score}</td>
                                        <td>{ele.date}</td>
                                        <td><Button variant="primary" onClick={() => handleQuiz(ele.quizID)}>View Details</Button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </>
                : <Redirect to='/login' />
            }
             <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
		</div>
	);
}

export default PastQuizScore;
