import React, { useState } from 'react'
import './Home.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    // const isLogged = true
    const SignOut = () => {
        console.log('Sign Out')
        dispatch(SIGN_OUT())
    }

    const getImage = () => {
        var image = new Uint8Array(isLogged.payload[0].photo.data.data)
        image = String.fromCharCode.apply(null, image)
        image = btoa(image)
        console.log(image)
        return (`data:image/png;base64,${image}`)
    }

	return (
		<div className="Home">
			{
                isLogged ? 
                <>
                    <img className="user__dp" src={getImage()} />
                    Welcome, <h1 style={{fontWeight: '800'}}>{isLogged.payload[0].firstName}</h1>
                    <Link to="/quiz"><button className="btn btn-primary">Start Quiz</button></Link>
                    <div>
                        <button className="btn btn-primary" onClick={() => SignOut()}>Logout</button>
                    </div>
                </>
                : <Redirect to='/login' />
            }
		</div>
	);
}

export default Home;
