import React, { useRef, useEffect, useState } from 'react'
import * as ml5 from 'ml5';
import * as Webcam from 'react-webcam';

let collecting = false;
let targetLabel;
let inputs;
let brain;
let classify = false
let finalGesture = "";
// const classifySpeed = 300;
const recordTime = 7

function Collect() {

    const [recordCount, setRecordCount] = useState(0)
    const [recordStatus, setRecordStatus] = useState("")
    const [loadingStatus, setLoadingStatus] = useState("Please Wait! Loading...")

    const inputEl = useRef(null);
    const webcamRef = useRef(null);

    const init = async () => {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        video.width = videoWidth;
        video.height = videoHeight;
        console.log(video.width);

        let options = {
            inputs: 42,
            outputs: recordCount,
            task: 'classification',
            debug: true
        }

        brain = ml5.neuralNetwork(options);

        const handpose = ml5.handpose(video, modelLoaded);
        function modelLoaded() {
            console.log('HandPose Model Loaded!');
            setLoadingStatus("Step 1: Name and record at least 2 hand gestures!")
        }
        handpose.on('predict', detect);
    }

    useEffect(() => {
        init()
    }, [])


    const detect = (poses) => {
        if (collecting || classify) {
            if (poses.length > 0) {
                inputs = [];
                for (let i = 0; i < poses[0].landmarks.length; i++) {
                    inputs.push(poses[0].landmarks[i][0]);
                    inputs.push(poses[0].landmarks[i][1]);
                }
            }
            if (collecting) {
                console.log(inputs);
                let target = [targetLabel];
                brain.addData(inputs, target);
            } else if (classify) {
                brain.classify(inputs, gotResult)
            }
        }
    }

    // ==============================================================================================
    // COLLECT
    // ==============================================================================================

    function collect() {
        console.log(targetLabel);
        collecting = true;
        console.log("Collecting Data");
        setTimeout(() => {
            collecting = false;
            if(recordCount >= 1){
                setLoadingStatus("Step 2: Click train and watch the Neural network learn!")
            }
            setRecordStatus("")
        }, recordTime * 1000)
    }

    function handleRecord() {
        setRecordCount(recordCount + 1)
        targetLabel = inputEl.current.value
        setRecordStatus("Recording")
        collect()
    }

    function handleReset() {
        window.location.reload();
    }


    function handleTrain() {
        if(recordCount > 1){
            brain.normalizeData();
            brain.train({ epochs: 30 }, () => {
                console.log("model trained");
                setLoadingStatus("Step 3: Click the classify button to try it out or click save to download your trained files!");
            });
        }
    }


    // ==============================================================================================
    // CLASSIFY
    // ==============================================================================================

    let inter;

    function startClass() {
        classify = true
        displayClass()
    }

    function displayClass() {
        setInterval(() => {
            setRecordStatus(finalGesture);
        }, 300)
    }

    function stopClass() {
        classify = false;
        finalGesture = "";
    }

    function gotResult(error, results) {
        if (results[0].confidence > 0.87) {
            console.log(results[0].label);
            finalGesture = results[0].label;

        }
    }


    async function handleSave() {
        brain.save()
    }

    return (
        <div>
            <nav>
                <h1>TRAIN-IT</h1>
            </nav>
            <div>
                <h2>{loadingStatus}</h2>
            </div>

            <Webcam ref={webcamRef}
                audio={false}
                mirrored={true}
                style={{
                    width: 640,
                    height: 480,
                }} />
            <div>
                <div>
                    <h2>{recordStatus}</h2>
                </div>
                <div>
                    <input ref={inputEl} type="text" />
                    <button onClick={handleRecord}>Record</button>
                    <button onClick={handleReset}>RESET</button>
                </div>
                <div>
                    <div><h2>{recordCount + " Hand Gestures Recorded!"}</h2></div>
                </div>
                <button onClick={() => handleTrain()}>train</button>
                <button onClick={() => startClass()}>Classify</button>
                <button onClick={() => stopClass()}>Stop</button>
                <button onClick={() => handleSave()}>save files to downloads</button>
            </div>
        </div>
    )
}

export default Collect
