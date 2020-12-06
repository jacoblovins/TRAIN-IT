import React, { useRef, useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCircle } from "react-icons/fa";
import * as ml5 from 'ml5';
import * as Webcam from 'react-webcam';
import Loader from "../components/Loader";

let collecting = false;
let targetLabel;
let inputs;
let brain;
let classify = false;
let finalGesture = "";
const recordTime = 7;



function Collect() {

    const [recordCount, setRecordCount] = useState(0);
    const [recordStatus, setRecordStatus] = useState("");
    const [loadingStatus, setLoadingStatus] = useState("Just a moment, Train-IT is loading...");
    const [loading, setLoading] = useState(true);
    const [recordReady, setRecordReady] = useState(false);
    const [gestureLabels, setGestureLabels] = useState([]);
    const inputEl = useRef(null);
    const webcamRef = useRef(null);

    const init = async () => {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        video.width = videoWidth;
        video.height = videoHeight;

        let options = {
            inputs: 63,
            outputs: recordCount,
            task: 'classification',
            debug: true
        }
        brain = ml5.neuralNetwork(options);

        const handpose = ml5.handpose(video, modelLoaded);
        function modelLoaded() {
            console.log('HandPose Model Loaded!');
            setLoadingStatus("Ready. Follow the steps below.");
            setLoading(false);
        }
        handpose.on('predict', detect);
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const detect = (poses) => {
        if (poses.length > 0) {
            setRecordReady(true);
            if (collecting || classify) {
                inputs = [];
                for (let i = 0; i < poses[0].landmarks.length; i++) {
                    inputs.push(poses[0].landmarks[i][0]);
                    inputs.push(poses[0].landmarks[i][1]);
                    inputs.push(poses[0].landmarks[i][2]);
                }
            }
            if (collecting) {
                let target = [targetLabel];
                brain.addData(inputs, target);
            } else if (classify) {
                brain.classify(inputs, gotResult);
            }
        } else {
            setRecordReady(false);
        }
    }

    // ==============================================================================================
    // COLLECT
    // ==============================================================================================

    function collect() {
        collecting = true;
        console.log("Collecting Data");
        setTimeout(() => {
            collecting = false;
            if (recordCount >= 1) {
                setLoadingStatus("Train-IT is ready to be trained.");
            }
            setRecordStatus("");
            console.log("Finished Collecting");
            if (!gestureLabels.includes(targetLabel)) {
                setRecordCount(recordCount + 1);
            }
            setGestureLabels([...gestureLabels, targetLabel]);
        }, recordTime * 1000)
    }

    function handleRecord() {
        if (!recordReady) {
            alert("Please place your hand in view of the camera before recording");
        } else {
            targetLabel = inputEl.current.value;
            setRecordStatus("Recording");
            collect();
        }
    }

    function handleReset() {
        window.location.reload();
    }


    function handleTrain() {
        if (recordCount > 1) {
            brain.normalizeData();
            brain.train({ epochs: 30 }, () => {
                console.log("model trained");
                setLoadingStatus("Training Complete");
            });
        }
    }


    // ==============================================================================================
    // CLASSIFY
    // ==============================================================================================

    function startClass() {
        classify = true;
        displayClass();
    }

    function displayClass() {
        setInterval(() => {
            setRecordStatus(finalGesture);
        }, 300);
    }

    function gotResult(error, results) {
        if (results[0].confidence > 0.92) {
            console.log(results[0].label);
            finalGesture = results[0].label;
        }
    }


    async function handleSave() {
        brain.save();
    }

    return (
        <div id="main-train">
            <div>
                <h1 className="instructions">{loadingStatus}</h1>
            </div>
            <Container fluid>
                <Row>
                    <Col lg={6}>
                        <div id="input">
                            <div>
                                <h2>{collecting ? recordStatus : (recordCount + " Hand Gestures Recorded")}</h2>
                            </div>
                            <div className="step">
                                <h6>Step 1. Name your gesture</h6>
                                <input id="gInput" ref={inputEl} type="text" placeholder="e.g. Thumbs Up" />
                            </div>
                            <div className="step">
                                <h6>Step 2. Hold up your hand to the camera and click Record. Repeat Step 1 & 2 for at least 2 gestures.</h6>
                                <button className="any-btn" onClick={handleRecord}><FaCircle/> Record</button>
                            </div>
                            <div className="step">
                                <h6>Step 3. Register your data with Train-It. Watch as the neural network learns your gesture.</h6>
                                <button className="any-btn" onClick={() => handleTrain()}>Train</button>
                            </div>
                            <div className="step">
                                <h6>Step 4. Once the training reaches 30 epochs, click "Try It Out" and hold up your gestures for validation.</h6>
                                <button className="any-btn" onClick={() => startClass()}>Try It Out</button>
                            </div>
                            <div className="step">
                                <h6>Step 5. Download your model data and use it in your app!</h6>
                                <button className="any-btn" onClick={() => handleSave()}>Download Your Model</button>
                            </div>
                            <div>
                                <button id="delete" className="any-btn" onClick={handleReset}>Delete Gestures and Start Again</button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div id="video">
                            <h2 id="record-status">{recordStatus}</h2>
                            {loading ? (<Loader />) : null}
                            <Webcam id="webcam" ref={webcamRef}
                                audio={false}
                                mirrored={true}
                                style={{
                                    width: 640,
                                    height: 480
                                }} />
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Collect
