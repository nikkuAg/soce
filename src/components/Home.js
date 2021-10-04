import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { Footer } from './Footer'
import './home.css'
import { MenuHeader } from './Menu'

export const Home = () => {
    return (
        <React.Fragment>
            <MenuHeader active='home' set={false} />
            <h2 className="headingFull"><span className="headingFirst">S</span>election <span className="headingFirst">O</span>f <span className="headingFirst">C</span>olleges for <span className="headingFirst">E</span>ngineering <span className="fullform">(SOCE)</span></h2>
            <div id="video">
                <iframe id="frame1" width="700" height="400" src="https://www.youtube.com/embed/muvkLs-zFBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                <iframe id="frame2" width="300" height="150" src="https://www.youtube.com/embed/muvkLs-zFBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                <a id="frame3" href="https://www.youtube.com/watch?v=muvkLs-zFBQ" target="_blank">
                    <Label>
                        <Icon name="youtube" className="extra" />
                        Play Video
                    </Label>
                </a>
            </div>
            <Footer />
        </React.Fragment>
    )
}
