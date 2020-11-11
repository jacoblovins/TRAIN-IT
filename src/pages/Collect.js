import React, { useRef, useEffect, useState } from 'react'
import * as ml5 from 'ml5';
import * as Webcam from 'react-webcam';

let collecting = false;
let targetLabel;
let inputs;
let brain;
let classify = false
// const classifySpeed = 300;
const recordTime = 5

function Collect() {

    const [recordCount, setRecordCount] = useState(0)
    const [recordStatus, setRecordStatus] = useState("")

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
            console.log('Finished Collecting Data');
            setRecordStatus("")
        }, recordTime * 1000)
    }

    function handleRecord() {
        setRecordCount(recordCount + 1)
        targetLabel = inputEl.current.value
        setRecordStatus("Recording")
        collect()
    }


    function handleTrain() {
        brain.normalizeData();
        brain.train({ epochs: 10 }, () => {
            console.log("model trained");
        })
    }


    // ==============================================================================================
    // CLASSIFY
    // ==============================================================================================

    let inter;

    function startClass() {
        classify = true
        // inter = setInterval(() => {
        //     classifyPose()
        // }, classifySpeed);
    }

    function stopClass() {
        classify = false
        // clearInterval(inter)
    }

    function gotResult(error, results) {
        if (results[0].confidence > 0.75) {
            console.log(results[0].label)

        }
    }


    async function handleSave() {
        brain.save()
    }

    return (
        <div>

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