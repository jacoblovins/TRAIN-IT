import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer>
      <hr />
      <p className="pull-right">
      See Train-IT Applied<img className="footer-icon" src={process.env.PUBLIC_URL + "/images/pocit.png"} alt="pocit logo" />
      </p>
    </footer>
  );
}

export default Footer;
