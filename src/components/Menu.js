import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Menu, Icon, Dropdown, DropdownMenu, DropdownItem, MenuItem, DropdownHeader, DropdownDivider } from 'semantic-ui-react';
import './style.css';



export const MenuHeader = (props) => {
    const history = useHistory();
    const [state, setstate] = useState({ activeItem: props.active });
    const [click, setclick] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);


    const handleItemClick = (e, { name, path }) => {
        setstate({ activeItem: name });
        if (path === 'home') {
            history.push('/home');
        }
        else if (path === 'colleges' || path === "seats") {
            history.push(`/${path}/${name}`);
        }
    }
    function displayMenuMobile() {
        click ? setclick(false) : setclick(true);
    }

    useEffect(() => {
        const element = document.getElementsByClassName('hamburgerIcon');
        ReactDOM.findDOMNode(element[0]).style.display === '' ? setclick(false) : setclick(true);
    }, [windowWidth])

    useEffect(() => {
        const elemnt = document.getElementsByClassName('hamburger');
        ReactDOM.findDOMNode(elemnt[0]).style.display = click ? 'block' : 'none';
    }, [click])


    return (
        <React.Fragment>
            <div>
                <Menu className="navBar" borderless>
                    <Menu.Item
                        name='home'
                        active={state.activeItem === 'home'}
                        path='home'
                        onClick={handleItemClick}
                    >
                        Home
                    </Menu.Item>
                    <MenuItem
                        active={state.activeItem === 'colleges'}>
                        <Dropdown text="Colleges & Seat Matrix" pointing name="colleges">
                            <DropdownMenu>
                                <DropdownHeader>Colleges</DropdownHeader>
                                <DropdownItem text="IIT" name="IIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="IIIT" name="IIIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="NIT" name="NIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="GFTI" name="GFTI" path="colleges" onClick={handleItemClick} />
                                <DropdownDivider />
                                <DropdownHeader>Seat Matrix</DropdownHeader>
                                <DropdownItem text="IIT Seat Matrix" name="IIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="IIIT Seat Matrix" name="IIIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="NIT Seat Matrix" name="NIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="GFTI Seat Matrix" name="GFTI" path="seats" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'prediction'}>
                        <Dropdown text="College Predictions" pointing name="prediction">
                            <DropdownMenu>
                                <DropdownHeader>College and Branch Prediction</DropdownHeader>
                                <DropdownItem text="IIT Prediction" name="IIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="IIIT Prediction" name="IIIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="NIT Prediction" name="NIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="GFTI Prediction" name="GFTI Prediction" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <Menu.Item
                        name='contact us'
                        active={state.activeItem === 'contact us'}
                        onClick={handleItemClick}
                    >
                        Contact Us
                    </Menu.Item>
                </Menu>
            </div>
            <div className="hamburger">
                <Menu vertical borderless className="navBar">
                    <Menu.Item
                        name='home'
                        active={state.activeItem === 'home'}
                        onClick={handleItemClick}>
                        Home
                    </Menu.Item>
                    <MenuItem
                        active={state.activeItem === 'colleges'}>
                        <Dropdown text="Colleges & Seat Matrix" pointing className="mobile" style={{ display: 'flex', alignItems: 'center' }}>
                            <DropdownMenu>
                                <DropdownHeader>Colleges</DropdownHeader>
                                <DropdownItem text="IIT" name="IIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="IIIT" name="IIIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="NIT" name="NIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="GFTI" name="GFTI" path="colleges" onClick={handleItemClick} />
                                <DropdownDivider />
                                <DropdownHeader>Seat Matrix</DropdownHeader>
                                <DropdownItem text="IIT Seat Matrix" name="IIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="IIIT Seat Matrix" name="IIIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="NIT Seat Matrix" name="NIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="GFTI Seat Matrix" name="GFTI" path="seats" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem active={state.activeItem === 'prediction'}>
                        <Dropdown text="College Predictions" pointing="top left" name="prediction" className="mobile prediction" style={{ display: "flex", alignItems: 'center' }} onClick={handleItemClick}>
                            <DropdownMenu>
                                <DropdownHeader>College and Branch Prediction</DropdownHeader>
                                <DropdownItem text="IIT Prediction" name="IIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="IIIT Prediction" name="IIIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="NIT Prediction" name="NIT Prediction" onClick={handleItemClick} />
                                <DropdownItem text="GFTI Prediction" name="GFTI Prediction" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <Menu.Item
                        name='contact us'
                        active={state.activeItem === 'contact us'}
                        onClick={handleItemClick}
                    >
                        Contact Us
                    </Menu.Item>
                </Menu>
            </div>
            <div className="navigation">
                <h1 className="heading" style={{ fontFamily: "'Pacifico', cursive" }}>SOCE</h1>
                <Icon name="align justify" size="big" onClick={displayMenuMobile} className="hamburgerIcon" />
            </div>
        </React.Fragment>
    )
}