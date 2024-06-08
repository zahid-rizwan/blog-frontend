// import axios from "axios";
import { myAxios } from "./helper";
export const signup=async(user)=>{
    console.log(user)
    return myAxios.post('/api/auth/register',user)
    .then((response)=>response.data)
    // try{
    //     const response=await axios.post('http://localhost:9090/api/auth/register',user);
    //     console.log(response)
    //     if(response.status===201){
    //         return response.data
    //     }
    // }catch(error){
    //     console.log(error);
        
    // }
   
}
export const login=(loginDetail)=>{
    return myAxios.post('api/auth/login',loginDetail).then((response)=>response.data);
}