import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { getCurrentUser, isLoggedIn } from "../auth";
import { Button } from "@material-tailwind/react";
import userContext from "./Context/userContext";
const Post = ({ post ,deletePost}) => {
  // console.log(post.user.name)
  const [user,setUser] = useState({})
  const [login,setLogin] = useState(false)
  const userContextData = useContext(userContext);
  useEffect(()=>{
    setUser(getCurrentUser());
    setLogin(isLoggedIn());
  },[])
  return (
      <div className="p-5 shadow-lg rounded cursor-pointer">
      <Link key={post.postId} to={'/post/' + post.id} >
        <div>
          <img alt="" src="https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683810.jpg?t=st=1716830203~exp=1716833803~hmac=22c79dfe6386f9e25f012f659fe23dff56e9172b0a4b1d8d58cbe15adda6f75a&w=740" className="w-full" />{" "}
        </div>{" "}
        <h3 className="mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer">
          {post.title}
        </h3>{" "}
        {/* <p dangerouslySetInnerHTML={{__html:post.content.substring(0,15) + "....."}}></p> */}
        <p className="pb-2  text-gray-600">
          <FaUser className="inline-flex  items-center mr-2" /><span className=" mt-1">{post.user.name}</span>
        </p>
        <p className=" text-sm text-gray-500">Published:</p>{" "}
        {/* {post.title} */}
        

      {/* {post.content.substring(0,20)}.... */}
      </Link>
      {userContextData.user.login && (user && user.id==post.user.id ? <Button onClick={()=>deletePost(post)} color="red">Delete</Button>: '')}
      <Link to={`/user/update-blog/${post.id}`}>{userContextData.user.login && (user && user.id==post.user.id ? <Button className="ml-2"   color="blue">Update</Button>: '')}</Link>
      </div>

      
  
  );
};

export default Post;
