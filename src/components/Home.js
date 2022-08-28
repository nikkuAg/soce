import React from "react";
import "./home.css";
import { MenuHeader } from "./Menu";

export const Home = () => {
	return (
		<React.Fragment>
			<MenuHeader active='home' set={false} />
			<h2 className='headingFull'>
				<span className='headingFirst'>G</span>o for{" "}
				<span className='headingFirst'>S</span>election{" "}
				<span className='headingFirst'>O</span>f{" "}
				<span className='headingFirst'>C</span>olleges for{" "}
				<span className='headingFirst'>E</span>ngineering{" "}
				<span className='fullform'>(GoSOCE)</span>
			</h2>
			<div id='content' className='first'>
				<div id='myTimer'>
					We have updated this website to a newer version for a better user
					experience. Also, this website is now available in a more trusted
					environment provided by IIT Roorkee. Please visit the new website Rank
					Matrix on the following domain{" "}
					<a href='https://rankmatrix.iitr.ac.in'>
						https://rankmatrix.iitr.ac.in
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};
