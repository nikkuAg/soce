import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, HashRouter, Redirect } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
	return (
		<BrowserRouter>
			<HashRouter>
				<Route path='/home' component={Home} />
				<Redirect to='/home' />
			</HashRouter>
		</BrowserRouter>
	);
}

export default App;
