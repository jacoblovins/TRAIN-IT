import React from "react";
import "./style.css";
import handit from '../../images/hand.png'

function Loader() {
    return (
        <div className="text-center loading">
            <img id="loader" src={handit} alt="pocit icon" />
            <h2 id="loadingStatus">Loading</h2>
        </div>
    )
}

export default Loader;
