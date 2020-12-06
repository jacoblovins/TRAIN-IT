import React from "react";
import "./style.css";

function StartButton({link, label}) {
    return (
        <a href={link} className="get-started-btn">{label}</a>
    )
}

export default StartButton;
