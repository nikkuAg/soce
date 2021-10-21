import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { Footer } from './Footer'
import './home.css'
import { MenuHeader } from './Menu'
import { Popup } from './Popup'
import { Timer } from './Timer'

export const Home = () => {
    const [popUp, setpopUp] = useState(false)
    const [update, setupdate] = useState([])
    const [loading, setloading] = useState(true)
    const api = "https://mysoce.pythonanywhere.com/soce/update/"
    useEffect(() => {
        axios.get(api)
            .then(res => {
                setupdate(res.data.reverse())
                setloading(false)
            })
    }, [api])

    return (
        <React.Fragment>
            <MenuHeader active='home' set={false} />
            <h2 className="headingFull"><span className="headingFirst">G</span>o for <span className="headingFirst">S</span>election <span className="headingFirst">O</span>f <span className="headingFirst">C</span>olleges for <span className="headingFirst">E</span>ngineering <span className="fullform">(GoSOCE)</span></h2>
            <div id="content" className="first">
                <div id="myTimer">
                    <div id="timer2">
                        {/* <Timer for="filling choice for Mock Round - 1" year={2021} month={9} day={21} hour={17} min={0} sec={0} /> */}
                    </div>
                    <div id="updates">
                        <h3>Recent Updates</h3>
                        {loading ? <></> :
                            <marquee direction="up" height="250" scrollamount="2">
                                <ul type="square" id="ulText">
                                    {update.map(text => (
                                        <li id="updateItem" key={text.id}>{text.text}</li>
                                    ))}
                                </ul>
                            </marquee>
                        }
                    </div>
                </div>
                <div id="timeLeft">
                    <div id="timer1">
                        {/* <Timer for="filling choice for Mock Round - 1" year={2021} month={9} day={21} hour={17} min={0} sec={0} /> */}
                    </div>
                    <div id="homeVideo">
                        <div className="videoHelp" id="frame">
                            <iframe width="300" height="180" src="https://www.youtube.com/embed/AIpJOCHTGWU" title="YouTube video player" frameborder="0" allowFullScreen />
                            <p>Help Video for SOCE Prediction</p>
                        </div>
                        <div className="videoHelp" id="frame">
                            <iframe width="300" height="180" src="https://www.youtube.com/embed/mNCT5ZsqGLk" title="YouTube video player" frameborder="0" allowFullScreen />
                            <p>Help Video for SOCE Trend</p>
                        </div>
                        <div className="videoHelp" id="frame2">
                            <iframe width="250" height="120" src="https://www.youtube.com/embed/AIpJOCHTGWU" title="YouTube video player" frameborder="0" allowFullScreen />
                            <p>Help Video for SOCE Prediction</p>
                        </div>
                        <div className="videoHelp" id="frame2">
                            <iframe width="250" height="150" src="https://www.youtube.com/embed/mNCT5ZsqGLk" title="YouTube video player" frameborder="0" allowFullScreen />
                            <p>Help Video for SOCE Trend</p>
                        </div>
                        <div className="videoHelp" id="frame3">
                            <a href="https://www.youtube.com/watch?v=AIpJOCHTGWU" target="_blank">
                                <Label>
                                    <Icon name="youtube" className="extra" />
                                    Play Video
                                </Label>
                            </a>
                            <p>Help Video for SOCE Prediction</p>
                        </div>
                        <div className="videoHelp" id="frame3">
                            <a href="https://www.youtube.com/watch?v=mNCT5ZsqGLk" target="_blank">
                                <Label>
                                    <Icon name="youtube" className="extra" />
                                    Play Video
                                </Label>
                            </a>
                            <p>Help Video for SOCE Trend</p>
                        </div>
                    </div>
                </div>

            </div>
            <div id="increaseImg">
                <p id="heading1">Summary of Seats Increased/Decreased in JoSAA 2021</p>
                <p id="heading2">(For more details kindly visit 'Seat Matrix' {`->`} 'Seat Increased/Decreased in JoSAA 2021')</p>
                <img src={require("../images/increase.png").default} width="100%" />
            </div>
            <div id="pragraphM">
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
            <div id="content" className="chnages2">
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
                <div id="updates" className="changes">
                    <h3>New SOCE Trend</h3>
                    <p id="trendD">for<br />IIT Kanpur (Electrical 4 years) (General, Gender Neutral).<br />JEE Adv Rank: 920</p>
                    <img src={require("../images/trend.png").default} width="100%" />
                    <p>More such trend refer to <a id="soceTrend" href="#/trend" >SOCE Trend</a></p>
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
