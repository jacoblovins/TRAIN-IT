import React, { useRef, useEffect } from 'react'
import * as Webcam from 'react-webcam';
import * as ml5 from 'ml5';

let brain;
let inputs;
let pose;

function Classify() {
    let working = false;

    const webcamRef = useRef(null);

    const runHandpose = async () => {
        const video = await webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        video.width = videoWidth;
        video.height = videoHeight;
        console.log(video.width);

        const handpose = ml5.handpose(video, modelLoaded);
        function modelLoaded() {
            console.log('Model Loaded!');
        }

        handpose.on('predict', detect);

        let options = {
            inputs: 42,
            outputs: 4,
            task: 'classification',
            debug: true
        }

        brain = ml5.neuralNetwork(options);

        const modelInfo = {
            model: 'data/model.json',
            metadata: 'data/model_meta.json',
            weights: 'data/model.weights.bin'
        }

        brain.load(modelInfo, brainReady);

        function brainReady() {
            console.log('brain ready');
        }

    };

    useEffect(() => {
        runHandpose()
    }, [])

    let inter;

    function startClass() {
        working = true
        inter = setInterval(() => {
            classifyPose()
        }, 300);
    }

    function stopClass() {
        working = false
        clearInterval(inter)
    }


    function classifyPose() {
        if (pose && working) {
            inputs = [];
            for (let i = 0; i < pose.landmarks.length; i++) {
                inputs.push(pose.landmarks[i][0]);
                inputs.push(pose.landmarks[i][1]);
            }
            brain.classify(inputs, gotResult)
        } 
    }

    function gotResult(error, results) {
        if (results[0].confidence > 0.75) {
            console.log(results[0].label)
        }
    }

    function detect(poses) {
        if (poses.length > 0) {
            working = true
            pose = poses[0];
        } else {
            working = false
        }
    };

    return (
        <div>
            <Webcam ref={webcamRef}
                style={{
                    width: 640,
                    height: 480,
                }} />
            <div>
                <button onClick={() => startClass()}>Classify</button>
                <button onClick={() => stopClass()}>Stop</button>
            </div>
        </div>
    )
}

export default Classify
