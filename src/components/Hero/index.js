import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StartButton from "../StartButton";
import "./style.css";

function Hero() {
    return (
        <div>
            <div id="hero">
                <Container fluid>
                    <Row>
                        <Col className="hleft" lg={6}>
                            <h1>TRAIN-IT</h1>
                            <h3>A powerful tool that enables custom hand gesture recognition across intelligent edge applications.</h3>
                            <div>
                                <StartButton link="/TRAIN-IT/#main-train" label="Get Started" />
                            </div>
                        </Col>
                        <Col className="hero-img" lg={6} >
                            <img src={process.env.PUBLIC_URL + "/images/brain.jpg"} className="animated" alt="provider and patient" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="wave-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#010622" fill-opacity="1" d="M0,192L80,208C160,224,320,256,480,250.7C640,245,800,203,960,186.7C1120,171,1280,181,1360,186.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
        </div>
    )
}

export default Hero;
