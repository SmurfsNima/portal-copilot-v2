/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getTokenFromLocalStorage } from "@/store/token";
import { toast } from "react-toastify";

class Api {
  protected static base_url: string = "https://vercel-backend-one-roan.vercel.app/mobile";

  protected static post(url: string, data?: any,config?:any) {
    if(!config?.noPending ){
      toast.clearWaitingQueue()
      // toast.loading('pending ...')
    }
    const response = axios.post(this.base_url + url, data, {
      headers: {
        Authorization: "Bearer " + getTokenFromLocalStorage(),
      },
      // timeout:15000
    });
    return response;
  }

  protected static get(url:string) {
    toast.loading('pending ...')
    const response = axios.get(this.base_url+url);
    return response;    
  }

  protected static getCheck(value:string) {
    const response = axios.get(value,{
      method:'GET',
      headers:{
        Accept: 'video/mp4;charset=UTF-8',
        responseType: 'blob',
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Origin":"*"
      },
      
    });
    return response;        
  }
}

export default Api;
