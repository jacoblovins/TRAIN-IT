import React, { useRef, useEffect } from 'react'
import API from "../utils/API";
import * as ml5 from 'ml5';
import * as Webcam from 'react-webcam';

let status = "waiting";
let targetLabel;
let inputs;
// let handpose

let handpose;
let brain;
let pose;
// let video

function Collect({ pose, brain }) {
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
            outputs: 4,
            task: 'classification',
            debug: true
        }

        brain = ml5.neuralNetwork(options);

        handpose = ml5.handpose(video, modelLoaded);
        function modelLoaded() {
            console.log('HandPose Model Loaded!');
        }
        handpose.on('predict', detect);
    }

    useEffect(() => {
        init()
    }, [])

    const detect = (poses) => {
        if (poses.length > 0) {
            // console.log(poses)
            if (status === 'collecting') {
                inputs = [];
                for (let i = 0; i < poses[0].landmarks.length; i++) {
                    inputs.push(poses[0].landmarks[i][0]);
                    inputs.push(poses[0].landmarks[i][1]);
                }
                console.log(inputs);
                let target = [targetLabel];
                brain.addData(inputs, target);
            }
        }
    };

    // ==============================================================================================
    // COLLECT
    // ==============================================================================================

    function handleRecordLeft() {
        targetLabel = "Left"
        console.log(targetLabel);
        status = "collecting";
        console.log(status);
        setTimeout(() => {
            status = 'not collecting';
            console.log(status);
        }, 2000)
    }

    function handleRecordRight() {
        targetLabel = "Right"
        console.log(targetLabel);
        status = "collecting";
        console.log(status);
        setTimeout(() => {
            status = 'not collecting';
            console.log(status);
        }, 2000)
    }

    function handleRecordUp() {
        targetLabel = "Up"
        console.log(targetLabel);
        status = "collecting";
        console.log(status);
        setTimeout(() => {
            status = 'not collecting';
            console.log(status);
        }, 2000)
    }

    function handleRecordDown() {
        targetLabel = "Down"
        console.log(targetLabel);
        status = "collecting";
        console.log(status);
        setTimeout(() => {
            status = 'not collecting';
            console.log(status);
        }, 2000)
    }

    // async function handleSave() {
    //     // brain.saveData('training');
    //     console.log("collect file")
    //     const trainingData = brain.neuralNetworkData.data.raw
    //     API.saveTrainingFile(trainingData)
    // }

    function handleTrain() {
        brain.normalizeData();
        brain.train({ epochs: 10 }, finished)
    }

    function finished() {
        // console.log(brain);
        console.log("model trained");
        // brain.save()
    }

    // ==============================================================================================
    // CLASSIFY
    // ==============================================================================================


    return (
        <div>
            <Webcam ref={webcamRef}
                style={{
                    width: 640,
                    height: 480,
                }} />
            <div>
                <button onClick={() => handleRecordLeft()}>record Left</button>
                <button onClick={() => handleRecordRight()}>record Right</button>
                <button onClick={() => handleRecordUp()}>record Up</button>
                <button onClick={() => handleRecordDown()}>record Down</button>
                {/* <button onClick={() => handleSave()}>save</button> */}
                <button onClick={() => handleTrain()}>train</button>
            </div>
            <div><h2>{status}</h2></div>
        </div>
    )
}

export default Collect
