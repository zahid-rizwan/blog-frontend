import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AddPost } from "../components/AddPost";
import { getCurrentUser } from "../auth";
import { data } from "autoprefixer";
import { deletePostService, loadPostUserWise } from "../services/post-service";
import Post from "../components/Post";
import { toast } from "react-toastify";

const DashBoard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setUser(getCurrentUser());
    loadPostData();
    
  }, []);
  const loadPostData = () =>{
    loadPostUserWise(getCurrentUser().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const deletePost = (post)=>{
    deletePostService(post.id).then(res=>{
      console.log(res)
      toast.success("post is deleted")
      loadPostData();
    }).catch(error=>{
      console.log(error)
      toast.error("error in deleting the post")
    })
  }
  return (
    <>
      <Navbar />
      <div className="mt-20 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <AddPost />
        
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
      <div className=" grid p-1  md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-8 ">
   

          {posts.map((post,index)=>{
            return(
              <Post post={post} key={index} deletePost={deletePost}/>
            )
          })
          
          
          
          }
        </div>
        </div>
        </div>
    </>
  );
};

export default DashBoard;
