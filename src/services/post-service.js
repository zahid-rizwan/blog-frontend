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
 export const createComment=(comment,postId)=>{
    return privateAxios.post(`/api/post/${postId}/comments`,comment)
 }

 export const uploadPostImage=(image,postId)=>{
    let formData=new FormData()
    formData.append("image",image);
    return privateAxios.post(`/api/post/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>{response.data})
 }

 export const loadPostCategorywise = (categoryId) =>{
    return privateAxios.get(`/api/category/${categoryId}/posts`).then(response=>response.data)
 }

 export const  loadPostUserWise = (userId)=>{
    return privateAxios.get(`/api/user/${userId}/posts`).then(resp=>resp.data)
 }

 export const deletePostService = (postId) =>{
    return privateAxios.delete(`/api/posts/${postId}`).then(resp=>resp.data)
 }