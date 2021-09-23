import axios from 'axios'
import {toast} from "react-toastify";

axios.interceptors.response.use(response => response.data ? response.data : response, error => {
    const {status, data: {message}} = error.response

    toast.error(message);

    return Promise.reject(error);
})