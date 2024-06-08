import { privateAxios } from "./helper"
import { myAxios } from "./helper"
export const createPost=(postData)=>{
    // console.log(postData)
    return privateAxios.post(
        `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData
    )
    .then(response=>response.data)
}

//Get all post
export const loadAllPosts=(pageNumber,pageSize)=>{
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response)=>response.data)
}
 //load single post
 export const loadPost=(postId)=>{
    return myAxios.get("/api/posts/"+postId).then((response)=>response.data)
 }