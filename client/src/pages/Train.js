// import React from 'react'
// import * as ml5 from 'ml5';
// let brain;

// function Train() {

//     function trainModel() {
//         let options = {
//             inputs: 42,
//             outputs: 4,
//             task: 'classification',
//             debug: true
//         }
        
//         brain = ml5.neuralNetwork(options);
        
//         brain.loadData('training.json', dataReady);
        
//         function dataReady() {
//             brain.normalizeData();
//             brain.train({epochs: 50}, finished)
//         }
//         function finished() {
//             console.log("model trained");
//             brain.save()
//         }
//     }


//     return (
//         <div>
//             <h1>Train</h1>
//         </div>
//     )
// }

// export default Train
