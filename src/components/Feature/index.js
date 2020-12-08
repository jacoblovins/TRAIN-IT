import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StartButton from "../StartButton";
import "./style.css";

function Feature() {
    return (
        <div>
            <div id="feature">
                <Container fluid>
                    <Row>
                        <Col className="fleft" lg={6}>
                            <h1>Real-world applicability.</h1>
                            <h5>The POC-IT app uses Train-IT and <a href="https://www.npmjs.com/package/hand-it" rel="noreferrer" target="_blank">Hand-IT</a> to provide a healthcare solution that allows users to get detailed instructions and information on their healthcare needs from their computer or mobile device, making use of machine learning to provide hand gesture control to allow users to maintain a clean environment while performing procedures.</h5>
                            <div>
                                <StartButton link="http://poc-it.herokuapp.com/" label="Try POC-IT" />
                            </div>
                        </Col>
                        <Col className="feature-img" lg={6} >
                            <img src={process.env.PUBLIC_URL + "/images/pi.png"} className="animated" alt="provider and patient" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Feature;
