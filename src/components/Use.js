import React from 'react'
import { MenuHeader } from './Menu'
import { Icon, Label } from 'semantic-ui-react'
import './home.css'
import { Footer } from './Footer'

export const Use = () => {
    return (
        <div>
            <MenuHeader active="use" />
            <div className="howToUse">
                <div id="pragraph2">
                    <h3 id="individual">
                        How to Use SOCE Prediction:
                    </h3>
                    <ul>
                        <li id="individual">For prediction based on previous years’ opening as well as closing rank click <a href="#/prediction"><em>‘SOCE Prediction’</em></a> and then <em>‘Default Prediction’</em>. </li>
                        <li id="individual">Fill all the desired details and click <em>‘Submit’</em></li>
                        <li id="individual">Click <em>‘Click to Get Prediction’</em> on next page</li>
                        <li id="individual">Now it will highlight all previous years’ cutoff in different colour. Your prediction based on colour coding is as follows:</li>
                        <ul>
                            <li id="individual">Very <strong>High</strong> probability for getting the branch/ college highlighted in <span id="green" >GREEN</span> colour even in case cut-off of current year is decreases from the previous year’s cut-off by % figure filled by you under ‘Variation in CutOff Percentage(%)’</li>
                            <li id="individual">Very <strong>Low</strong> probability for getting the branch/ college highlighted in <span id="red" >RED</span> colour as your rank is higher than the cut-off of previous year by % figure filled by you under ‘Variation in CutOff Percentage(%)’</li>
                            <li id="individual">Probable to get the branch/ college highlighted in <span id="orange">ORANGE</span> colour in case cut-off of current year increases from the previous year’s cut-off by % figure filled by you under ‘Variation in CutOff Percentage(%)’</li>
                            <li id="individual">Probable to get the branch/ college highlighted in <span id="yellow">YELLOW</span> colour even in case cut-off of current year decreases from the previous year’s cut-off by % figure filled by you under ‘Variation in CutOff Percentage(%)’</li>
                        </ul>
                        <li id="individual">You can refer to the video for further help</li>
                    </ul>
                </div>

                <div id="video">
                    <iframe id="frame1" width="500" height="300" src="https://www.youtube.com/embed/muvkLs-zFBQ" title="YouTube video player" frameborder="0" allowFullScreen />
                    <iframe id="frame2" width="300" height="150" src="https://www.youtube.com/embed/muvkLs-zFBQ" title="YouTube video player" frameborder="0" allowFullScreen />
                    <a id="frame3" href="https://www.youtube.com/watch?v=muvkLs-zFBQ" target="_blank">
                        <Label>
                            <Icon name="youtube" className="extra" />
                            Play Video
                        </Label>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}
