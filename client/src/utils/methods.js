// const detect = (poses) => {
//     if (poses.length > 0) {
//         // console.log(poses)
//         if (status === 'collecting') {
//             inputs = [];
//             for (let i = 0; i < poses[0].landmarks.length; i++) {
//                 inputs.push(poses[0].landmarks[i][0]);
//                 inputs.push(poses[0].landmarks[i][1]);
//             }
//             console.log(inputs);
//             let target = [targetLabel];
//             brain.addData(inputs, target);
//         }
//     }
// };

// function handleRecordLeft() {
//     targetLabel = "Left"
//     console.log(targetLabel);
//     status = "collecting";
//     console.log(status);
//     setTimeout(() => {
//         status = 'not collecting';
//         console.log(status);
//     }, 2000)
// }

// function handleRecordRight() {
//     targetLabel = "Right"
//     console.log(targetLabel);
//     status = "collecting";
//     console.log(status);
//     setTimeout(() => {
//         status = 'not collecting';
//         console.log(status);
//     }, 2000)
// }

// function handleRecordUp() {
//     targetLabel = "Up"
//     console.log(targetLabel);
//     status = "collecting";
//     console.log(status);
//     setTimeout(() => {
//         status = 'not collecting';
//         console.log(status);
//     }, 2000)
// }

// function handleRecordDown() {
//     targetLabel = "Down"
//     console.log(targetLabel);
//     status = "collecting";
//     console.log(status);
//     setTimeout(() => {
//         status = 'not collecting';
//         console.log(status);
//     }, 2000)
// }

// // async function handleSave() {
// //     // brain.saveData('training');
// //     console.log("collect file")
// //     const trainingData = brain.neuralNetworkData.data.raw
// //     API.saveTrainingFile(trainingData)
// // }

// function handleTrain() {
//     // brain.loadData('data/training.json', dataReady);
    
//     // function dataReady() {
//         brain.normalizeData();
//         brain.train({epochs: 10}, finished)
//     }

//     function finished() {
//         // console.log(brain);
//         console.log("model trained");
//         // brain.save()
//     // }
// }