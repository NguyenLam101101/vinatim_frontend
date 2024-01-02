import axios from "axios";
import { APP_SERVER } from "./constant";
import { NotificationManager } from "react-notifications";

export async function callPostAPI(endpointOrAPI, data, isJson) {
    if (!endpointOrAPI.startsWith("http")) {
        endpointOrAPI = APP_SERVER + endpointOrAPI;
    }
    if (isJson) {
        let reponse = await axios.post(endpointOrAPI, data, {
            headers: {
                "Authorization": localStorage.getItem("Authorization"),
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.data)
            .catch(error => NotificationManager.error("Có lỗi xảy ra: " + error, 3000));
        return reponse;
    }
    else {
        let formData = new FormData();
        Object.entries(data).forEach(entry => {
            if(entry[1]){
                formData.set(entry[0], entry[1])
            }
        });
        let reponse = await axios.post(endpointOrAPI, formData, {
            headers: {
                "Authorization": localStorage.getItem("Authorization"),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(resp => resp.data)
            .catch(error => NotificationManager.error("Có lỗi xảy ra: " + error, 3000));
        return reponse;
    }
}

export async function callGetAPI(endpointOrAPI) {
    if (!endpointOrAPI.startsWith("http")) {
        endpointOrAPI = APP_SERVER + endpointOrAPI;
    }
    let reponse = await axios.get(endpointOrAPI, {
        headers: {
            "Authorization": localStorage.getItem("Authorization")
        }
    })
        .then(resp => resp.data)
        .catch(error => NotificationManager.error("Có lỗi xảy ra: " + error, 3000));
    return reponse;
}