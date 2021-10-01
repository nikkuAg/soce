import React from 'react'
import { Footer } from './Footer'
import './home.css'
import { MenuHeader } from './Menu'

export const Home = () => {
    return (
        <React.Fragment>
            <MenuHeader active='home' />
            <h2 className="headingFull"><span className="headingFirst">S</span>election <span className="headingFirst">O</span>f <span className="headingFirst">C</span>olleges for <span className="headingFirst">E</span>ngineering</h2>
            <Footer />
        </React.Fragment>
    )
}