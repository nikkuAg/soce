import React from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import "./style.css";

export const MenuHeader = (props) => {
	return (
		<React.Fragment>
			<div>
				<Menu className='navBar' borderless>
					<MenuItem name='home' path='home'>
						Home
					</MenuItem>
				</Menu>
			</div>
		</React.Fragment>
	);
};

MenuHeader.defaultProps = {
	set: true,
};
