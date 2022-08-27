import React from "react";
import "./home.css";
import { MenuHeader } from "./Menu";

export const Home = () => {
	return (
		<React.Fragment>
			<MenuHeader active='home' set={false} />
			<h2 className='headingFull'>
				<span className='headingFirst'>R</span>ank
				<span className='headingFirst'>M</span>atrix
			</h2>
			<div id='content' className='first'>
				<div id='myTimer'>
					We have redesigned this webiste and shifted to a new domain. Please
					refer{"  "}
					<a href='https://rankmatrix.iitr.ac.in'>
						https://rankmatrix.iitr.ac.in
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};
