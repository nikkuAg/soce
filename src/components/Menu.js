import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Menu, Icon, Dropdown, DropdownMenu, DropdownItem, MenuItem } from 'semantic-ui-react';
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
        if (path === 'colleges' || path === "seats" || path === 'ranks') {
            history.push(`/${path}/${name}`);
        }
        else {
            history.push(`/${path}`);
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
                <div class="useLaptop">
                    <marquee><p>**Kindly use this site on Desktop/Laptop or Landscape view on mobile for better experience**</p></marquee>
                </div>
                <Menu className="navBar" borderless>
                    <MenuItem
                        name='home'
                        active={state.activeItem === 'home'}
                        path='home'
                        onClick={handleItemClick}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'prediction'}>
                        <Dropdown text="SOCE Prediction" pointing name="prediction">
                            <DropdownMenu>
                                <DropdownItem text="Prediction" name="prediction" path="prediction" onClick={handleItemClick} />
                                <DropdownItem text="SOCE Trend" name="prediction" path="trend" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'ranks'}>
                        <Dropdown text="Opening and Closing Ranks" pointing name="ranks">
                            <DropdownMenu>
                                <DropdownItem text="IITs" name="IIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="IIITs" name="IIIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="NITs" name="NIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs" name="GFTI" path="ranks" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'matrix'}>
                        <Dropdown text="Seat Matrix" pointing name="matrix">
                            <DropdownMenu>
                                <DropdownItem text="IITs Seat Matrix" name="IIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="IIITs Seat Matrix" name="IIIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="NITs Seat Matrix" name="NIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs Seat Matrix" name="GFTI" path="seats" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'colleges'}>
                        <Dropdown text="List of Colleges" pointing name="colleges">
                            <DropdownMenu>
                                <DropdownItem text="IITs" name="IIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="IIITs" name="IIIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="NITs" name="NIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs" name="GFTI" path="colleges" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        name='use'
                        active={state.activeItem === 'use'}
                        path='how_to_use'
                        onClick={handleItemClick}
                    >
                        How to Use
                    </MenuItem>
                    <Menu.Item
                        name='contact us'
                        active={state.activeItem === 'contact us'}
                        onClick={handleItemClick}
                        path="contact_us"
                    >
                        Contact Us
                    </Menu.Item>
                </Menu>
            </div>
            <div className="navigation">
                {props.set ? <h2 className="heading" style={{ fontFamily: "'Pacifico', cursive" }} >GoSOCE</h2> : <></>}
                <marquee style={{ color: "red", margin: "1rem", fontSize: "2rem", }}><p>**Site is under maintenance for updating seat matrix of 2021. So you will not be able to access the site for some time. Sorry for inconvenience.**</p></marquee>
                <Icon name="align justify" size="big" onClick={displayMenuMobile} className="hamburgerIcon" />
            </div>
            <div className="hamburger">
                <Menu vertical borderless className="navBar">
                    <MenuItem
                        name='home'
                        active={state.activeItem === 'home'}
                        path='home'
                        onClick={handleItemClick}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'prediction'}>
                        <Dropdown text="SOCE Prediction" pointing name="prediction">
                            <DropdownMenu>
                                <DropdownItem text="Prediction" name="prediction" path="prediction" onClick={handleItemClick} />
                                <DropdownItem text="SOCE Trend" name="prediction" path="trend" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'ranks'}>
                        <Dropdown text="Opening and Closing Ranks" pointing name="ranks">
                            <DropdownMenu>
                                <DropdownItem text="IITs" name="IIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="IIITs" name="IIIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="NITs" name="NIT" path="ranks" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs" name="GFTI" path="ranks" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'matrix'}>
                        <Dropdown text="Seat Matrix" pointing name="matrix">
                            <DropdownMenu>
                                <DropdownItem text="IITs Seat Matrix" name="IIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="IIITs Seat Matrix" name="IIIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="NITs Seat Matrix" name="NIT" path="seats" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs Seat Matrix" name="GFTI" path="seats" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        active={state.activeItem === 'colleges'}>
                        <Dropdown text="List of Colleges" pointing name="colleges">
                            <DropdownMenu>
                                <DropdownItem text="IITs" name="IIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="IIITs" name="IIIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="NITs" name="NIT" path="colleges" onClick={handleItemClick} />
                                <DropdownItem text="GFTIs" name="GFTI" path="colleges" onClick={handleItemClick} />
                            </DropdownMenu>
                        </Dropdown>
                    </MenuItem>
                    <MenuItem
                        name='use'
                        active={state.activeItem === 'use'}
                        path='how_to_use'
                        onClick={handleItemClick}
                    >
                        How to Use
                    </MenuItem>
                    <Menu.Item
                        name='contact us'
                        active={state.activeItem === 'contact us'}
                        onClick={handleItemClick}
                        path="contact_us"
                    >
                        Contact Us
                    </Menu.Item>
                </Menu>
            </div>
        </React.Fragment >
    )
}


MenuHeader.defaultProps = {
    'set': true,
}