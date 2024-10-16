import axios from "axios";
import { toast } from "react-toastify";
import '@/api/axios';

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    }
    if(response.status ==401 || response.data.detail =='Invalid token.'){
        localStorage.clear()
        window.location.reload(); 
    }    
    if(response.data.detail && response.data.detail !='Invalid token.' && response.data.detail !='Not Found'){
        toast.error(response.data.detail)
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});