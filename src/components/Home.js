import React, { useState } from 'react'
import { Footer } from './Footer'
import './home.css'
import { MenuHeader } from './Menu'
import { Popup } from './Popup'

export const Home = () => {
    const [popUp, setpopUp] = useState(false)
    return (
        <React.Fragment>
            <MenuHeader active='home' set={false} />
            <h2 className="headingFull"><span className="headingFirst">G</span>o for <span className="headingFirst">S</span>election <span className="headingFirst">O</span>f <span className="headingFirst">C</span>olleges for <span className="headingFirst">E</span>ngineering <span className="fullform">(GoSOCE)</span></h2>
            <div id="content">
                <div id="updates">
                    <h3>Recent Updates</h3>
                    <marquee direction="up" height="250" scrollamount="2">
                        <ul>
                            <li>You can view the site on mobile but use landscape mode for better experience.</li>
                            <li>Seat Matrix of 2021 will be updated soon</li>
                        </ul>
                    </marquee>
                </div>
                <div id="pragraph">
                    <h3 id="individual">
                        JEE (Mains) and JEE (Advance) Over…
                    </h3>
                    <p id="individual">Now it’s time to choose best college and branch according to your rank in the exams… but how?
                    </p>
                    <p id="individual"> Here is the solution…
                    </p>
                    <p id="individual"> This website has been designed to help the Engineering aspirants and their parents to know about
                        the previous years’ cut-off Rank for various colleges and branches so that they can take an informed
                        decision to choose best college and branch according to the rank secured in the exam.For better
                        understanding click on <a href="#/how_to_use"><em>‘How to use’</em></a>
                    </p>
                </div>
            </div>
            <div id="content">
                <div id="pragraph">
                    <h3 id="individual">
                        Unique features of the website:
                    </h3>
                    <ul>
                        <li id="individual">Big compilation of previous opening and closing Ranks from year 2015 onwards</li>
                        <li id="individual">Not a commercial website</li>
                        <li id="individual">Does not ask about your personal details like Mobile Number, Roll number etc.</li>
                        <li id="individual">Gives an idea about all branches and colleges on a single page</li>
                        <li id="individual">Probability of getting a branch in a particular college is shown using different colour schemes for better understanding</li>
                        <li id="individual">Prediction based on previous years’ opening as well as closing rank</li>
                        <li id="individual">Also get the prediction by selecting an expected variation in previous years’ opening/ closing rank (in terms of %)</li>
                        <li id="individual">For the sake of simplicity some minor modifications in the opening/ closing rank has been incorporated in the website. <span id="click" onClick={() => (setpopUp(true))} >Click</span> to get details. </li>
                        <li id="individual">Developed by an IIT Roorkee student for the benefit of public</li>
                        <li id="individual">New features can be added as per the requirement. Kindly send your feedback/ suggestions as per the link given on <a href="#/contact_us"><em>‘Contact Us’</em></a></li>
                    </ul>
                    <Popup show={popUp} close={setpopUp} />
                </div>
                <div id="updates">
                    <h3>Thanks for your encouraging words</h3>
                    <marquee direction="up" height="500" scrollamount="6" onMouseOver="this.stop()">
                        <img src={require("../images/1.PNG").default} width="100%" />
                        <img src={require("../images/2.PNG").default} width="100%" />
                        <img src={require("../images/3.PNG").default} width="100%" />
                        <img src={require("../images/4.PNG").default} width="100%" />
                        <img src={require("../images/5.PNG").default} width="100%" />
                        <img src={require("../images/6.PNG").default} width="100%" />
                        <img src={require("../images/7.PNG").default} width="100%" />
                        <img src={require("../images/8.PNG").default} width="100%" />
                        <img src={require("../images/9.PNG").default} width="100%" />
                        <img src={require("../images/10.PNG").default} width="100%" />
                        <img src={require("../images/11.PNG").default} width="100%" />
                        <img src={require("../images/12.PNG").default} width="100%" />
                        <img src={require("../images/13.PNG").default} width="100%" />
                        <img src={require("../images/14.PNG").default} width="100%" />
                        <img src={require("../images/15.PNG").default} width="100%" />
                        <img src={require("../images/16.PNG").default} width="100%" />
                        <img src={require("../images/17.PNG").default} width="100%" />
                        <img src={require("../images/18.PNG").default} width="100%" />
                        <img src={require("../images/19.PNG").default} width="100%" />
                        <img src={require("../images/20.PNG").default} width="100%" />
                        <img src={require("../images/21.PNG").default} width="100%" />
                        <img src={require("../images/22.PNG").default} width="100%" />
                        <img src={require("../images/23.PNG").default} width="100%" />
                        <img src={require("../images/24.PNG").default} width="100%" />
                        <img src={require("../images/25.PNG").default} width="100%" />
                        <img src={require("../images/26.PNG").default} width="100%" />
                        <img src={require("../images/27.PNG").default} width="100%" />
                        <img src={require("../images/28.PNG").default} width="100%" />
                        <img src={require("../images/29.PNG").default} width="100%" />
                        <img src={require("../images/30.PNG").default} width="100%" />
                        <img src={require("../images/31.PNG").default} width="100%" />



                    </marquee>
                </div>
            </div>

            <div id="pragraph2">
                <h3 id="individual2">
                    Disclaimer:
                </h3>
                <p id="individual2">
                    This website uses various relevant data available in open domain. Though utmost care has been taken while preparing this website, however it is advised to refer official websites before taking any decision regarding selection of college and branch based on the information available on this website. We will not be responsible for any mistake and inconformity in the information available on this website.
                </p>
            </div>
            <Footer />
        </React.Fragment >
    )
}
