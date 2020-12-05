import React, { useRef, useEffect, useState } from 'react'
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
    const [loadingStatus, setLoadingStatus] = useState("Please Wait! Loading...");
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
            setLoadingStatus("Step 1: Name and record at least 2 hand gestures!");
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
                setLoadingStatus("Step 2: Click train and watch the Neural network learn!");
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
                setLoadingStatus("Step 3: Click the Try It Out button and watch it guess or click save to download your trained files!");
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
            <div id="video">
                <h2>{recordStatus}</h2>
                {loading ? (<Loader />) : null}
                <Webcam id="webcam" ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    style={{
                        width: 640,
                        height: 480
                    }} />
            </div>
            <div id="input">
                <div>
                    <h2>{collecting ? recordStatus : (recordCount + " Hand Gestures Recorded!")}</h2>
                </div>
                <div>
                    <input ref={inputEl} type="text" placeholder="Thumbs Up" />
                    <button id="record" className="btn" onClick={handleRecord}>Record</button>
                </div>
                <div>

                    <button id="train" onClick={() => handleTrain()}>Train</button>
                </div>
                <div>
                    <button id="try" onClick={() => startClass()}>Try It Out</button>
                </div>
                <div>
                    <button id="download" onClick={() => handleSave()}>Download Your Model</button>
                </div>
                <div>
                    <button id="delete" onClick={handleReset}>Delete Gestures and Start Again</button>
                </div>
            </div>
        </div>
    )
}

export default Collect
