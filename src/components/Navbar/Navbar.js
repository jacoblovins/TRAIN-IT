import React from 'react'
import './navbar.css'
import logo from '../../images/TrainITIcon_1.png'
import pocit from '../../images/pocit.png'
import handit from '../../images/hand.png'


function Navbar() {
    return (
        <nav>
            <img id="logo" src={logo} alt="TRAIN-IT Logo" />
            <img id="pocit" src={pocit} alt="TRAIN-IT Logo" />
            <img id="handit" src={handit} alt="HAND-IT Logo" />
        </nav>
    )
}

export default Navbar
