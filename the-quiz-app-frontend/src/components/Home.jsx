import React, { useEffect, useState } from 'react'
import './Home.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from "react-router-dom";

function Home() {
    const [name, setName] = useState('')
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    // const isLogged = true
    const SignOut = () => {
        localStorage.removeItem("user");
        console.log('Sign Out')
        dispatch(SIGN_OUT())
    }

    useEffect(() => {
        if(isLogged === null) {
            var checkAuth = localStorage.getItem("user");
            dispatch(SIGN_IN(JSON.parse(checkAuth)))
        }
        // setName(isLogged.payload.firstName)
    },[])

    const getImage = () => {
        var binary = '';
        var bytes = new Uint8Array(isLogged.payload.photo.data.data)
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        var image = btoa(binary)
        return(`data:image/png;base64,${image}`)
    }

    const getName = () => {
        if(!name) {
            setName(isLogged.payload.firstName)
        }
    }

	return (
		<div className="Home">
			{
                isLogged ? 
                <>
                {getName()}
                    
                    <img className="user__dp" src={getImage()} alt="dp"/>
                    Welcome, <h1 style={{fontWeight: '800'}}>{name}</h1>
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
