import React, { useState } from 'react';
import { SIGN_IN } from '../reducers/auth';
import './Login.css';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function Login() {
	const [error, setError] = useState('')
	const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "mobile") {
          setMobile(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }

    const loginUserWithEmailAndPasswordHandler = (event, mobile, password) => {
        event.preventDefault();
		const data = {
			mobile,
			password
		}
		axios.post('http://localhost:5000/user/login', data)
		.then((userCredential) => {
            var user = userCredential.data;
            console.log(user)
            if(user.auth === true) {
                dispatch(SIGN_IN(user.user_data))
				localStorage.setItem("user", JSON.stringify(user.user_data));
            }
        })
        .catch((error) => {
			setError("Mobile Number or Password does not match!")
			console.log(error)
		});
    }

	return (
		<div className="Login">
			{
           		isLogged ? <Redirect to='/' /> : 
				<>
				<div className="box">
					<form>
						<h3 class="box__title">Login</h3>
						<div className="form-group">
							<label>Mobile</label>
							<input type="text" name="mobile" className="form-control" placeholder="Enter your mobile number" onChange={event => onChangeHandler(event)}/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" name="password" className="form-control" placeholder="*******" onChange={event => onChangeHandler(event)}/>
						</div>
						{<><p style={{color: 'red', fontWeight: '800'}}>{error}</p></>}
						<button type="submit" className="btn btn-primary btn-block" onClick={event => {loginUserWithEmailAndPasswordHandler(event, mobile, password);}}>Login</button>
						<p className="forgot-password text-right" style={{marginTop: '.5rem'}}>
							Don't have an account? <Link to='/signup'><b>Sign up</b></Link>
						</p>
					</form>
				</div>
				</>
			}
		</div>
	);
}

export default Login;
