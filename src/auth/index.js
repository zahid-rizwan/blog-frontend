//isLoggedIn

export const isLoggedIn=()=>{
    if(localStorage.getItem("data")==null){
        return false;
    }
    else{
        return true;
    }
}
//doLogin
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next();
}

//doLogout
export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}
//get current user
export const getCurrentUser=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    }
    else{
        undefined;
    }
}
export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).jwtToken

    }else{
        return null;
    }
}