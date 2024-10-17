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
    if(response.data.detail &&response.data.notif!=true &&response.data.detail !='Invalid token.' && response.data.detail !='Not Found'){
        toast.error(response.data.detail)
    }
    if ( response.data && response.data.detail) {
      // Handle the custom error provided in the response body
      return Promise.reject(new Error(response.data.detail)); // Reject the promise to trigger the catch block
    }    
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});