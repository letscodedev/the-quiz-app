import React, { useState } from 'react';
import { SIGN_IN } from '../reducers/auth';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './Signup.css';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDOB] = useState("");
    const [displayPhoto, setDisplayPhoto] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState("");

    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
          	setEmail(value);
        } else if (name === "password") {
          	setPassword(value);
        } else if (name === "first__name") {
			setFirstName(value);
		} else if (name === "last__name") {
			setLastName(value);
		} else if (name === "mobile") {
			setMobile(value);
		} else if (name === "city") {
			setCity(value);
		} else if (name === "gender") {
			setGender(value);
		} else if (name === "hobbies") {
			setHobbies([...hobbies, value]);
		} else if (name === "dob") {
			setDOB(value);
		} else if (name === "photo") {
			setDisplayPhoto(event.target.files[0]);
		}
    }

	const selectCountry = (val) => {
		setCountry(val)
	}

	const selectState = (val) => {
		setState(val)
	}

    const createUserWithEmailAndPasswordHandler = (event, firstName, lastName, email, password, country, state, city, mobile, dob, displayPhoto, hobbies, gender) => {
        event.preventDefault();
		console.log(firstName, lastName, email, password, country, state, city, mobile, dob, hobbies, gender)
		console.log(displayPhoto)
		const formData = new FormData();
		formData.append('mobile', mobile)
		formData.append('email', email)
		formData.append('password', password)
		formData.append('firstName', firstName)
		formData.append('lastName', lastName)
		formData.append('gender', gender)
		formData.append('dob', dob)
		formData.append('country', country)
		formData.append('state', state)
		formData.append('city', city)
		formData.append('hobbies', hobbies)
		formData.append('photo', displayPhoto)
		axios.post('http://localhost:5000/user/register', formData)
		.then((userCredential) => {
            var user = userCredential.data;
            console.log(user)
			dispatch(SIGN_IN(user.user_data))
        })
        .catch((error) => {
			console.log(error)
		});
    }

	return (
		<div className="Signup">
			{
           		isLogged ? <Redirect to='/' /> : 
					<>
					<div className="box">
						<form>
							<h3 class="box__title">Sign Up</h3>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" name="first__name" className="form-control" placeholder="First Name" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" name="last__name" className="form-control" placeholder="Last Name" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="password" name="password" className="form-control" placeholder="Password" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="password" name="confirm__password" className="form-control" placeholder="Confirm Password" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="email" name="email" className="form-control" placeholder="Email" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" name="mobile" className="form-control" placeholder="Mobile" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="form-group">
										<CountryDropdown className="form-control" value={country} onChange={(val) => selectCountry(val)} />
									</div>
								</div>
								<div className="col-md-4">
									<div className="form-group">
										<RegionDropdown className="form-control" country={country} value={state} onChange={(val) => selectState(val)} />
									</div>
								</div>
								<div className="col-md-4">
									<div className="form-group">
										<input type="text" name="city" className="form-control" placeholder="City" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label>Gender</label>
												<div class="form-check">
													<input class="form-check-input" type="radio" name="gender" value="Male" id="male"  onChange={event => onChangeHandler(event)}/>
													<label class="form-check-label" for="male">
														Male
													</label>
												</div>
												<div class="form-check">
													<input class="form-check-input" type="radio" name="gender" value="Female" id="female" onChange={event => onChangeHandler(event)}/>
													<label class="form-check-label" for="female">
														Female
													</label>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Hobbies</label>
												<div class="form-check">
													<input class="form-check-input" name="hobbies" type="checkbox" value="Playing Cricket" id="cricket" onChange={event => onChangeHandler(event)}/>
													<label class="form-check-label" for="cricket">
														Playing Cricket
													</label>
												</div>
												<div class="form-check">
													<input class="form-check-input" name="hobbies" type="checkbox" value="Swimming" id="Swimming" onChange={event => onChangeHandler(event)}/>
													<label class="form-check-label" for="Swimming">
														Swimming
													</label>
												</div>
												<div class="form-check">
													<input class="form-check-input" name="hobbies" type="checkbox" value="Travelling" id="Travelling" onChange={event => onChangeHandler(event)}/>
													<label class="form-check-label" for="Travelling">
														Travelling
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label>Date Of Birth</label>
										<input type="date" name="dob" className="form-control" onChange={event => onChangeHandler(event)}/>
									</div>
									<div className="form-group">
										<label>Display Picture</label>
										<input type="file" name="photo" className="form-control" onChange={event => onChangeHandler(event)}/>
									</div>
								</div>
							</div>
							<button type="submit" className="btn btn-primary btn-block" onClick={event => {createUserWithEmailAndPasswordHandler(event, firstName, lastName, email, password, country, state, city, mobile, dob, displayPhoto, hobbies, gender);}}>Sign Up</button>
							<p className="forgot-password text-right" style={{marginTop: '.5rem'}}>
								Already have an account? <Link to='/login'><b>Sign In</b></Link>
							</p>
						</form>
					</div>
				</>
			}
		</div>
	);
}

export default Signup;
