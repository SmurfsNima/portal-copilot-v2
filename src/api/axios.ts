import axios from "axios";
import { toast } from "react-toastify";
import '@/api/axios';

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    }
    if(response.status ==401 || response.status ==498 || response.data.detail == 'Unauthorized - User Not Found'||response.data.detail == 'Invalid or logged out token'||response.data.detail == 'Missing Authorization Header'||response.data.detail == 'Unauthorized - User does not match token' || response.data.detail == 'Signature has expired'){
        localStorage.clear()
        window.location.reload(); 
    }    

    if(response.data.detail){
       toast.error(response.data.detail) 
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});