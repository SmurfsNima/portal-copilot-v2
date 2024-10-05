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

    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});