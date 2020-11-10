/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Saves the collected data in a json file in the 
    // public/data folder
    getTrainingFile: function () {
        return axios.get("/api/collect");
    },

    // Saves the classification data in 3 json files in the 
    // public/data folder
    getModelFiles: function () {
        return axios.get("/api/model");
    },

    // Saves the collected data in a json file  
    // on the server
    saveTrainingFile: function (collectData) {
        // console.log(collectData)
        const finalData = JSON.stringify(collectData)
        const data = "{\"data\":" + finalData + "}"
        return axios.post("/api/collect", {data});
    },

    // Saves the classification data in 3 json files  
    // on the server
    saveModelFiles: function (modelData) {
        return axios.post("/api/model", modelData);
    }
};