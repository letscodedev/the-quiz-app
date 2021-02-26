import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import PastQuizScore from './components/PastQuizScore';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/quiz" component={Quiz} />
					<Route exact path="/" component={Home} />
					<Route exact path="/pastscore" component={PastQuizScore} />
				</Switch>
			</div>
    	</Router>
	);
}

export default App;