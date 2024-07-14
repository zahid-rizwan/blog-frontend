import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment,setComment] = useState({
    content:''
  })
  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong !!");
      });
  }, []);
  const printDate = (numbers) => {
    return new Date(numbers).toString();
  };
  const submitPost=()=>{
    if(!isLoggedIn()){
      toast.error('Plese log in');
      return;
    }
    if(comment.content.trim()===''){
      return;
    }
    event.preventDefault();
    createComment(comment,post.id)
    .then(data=>{
      toast.success("success")
      setPost({
        ...post,
        
        comments:[...post.comments,data.data]
      })
      setComment({
        content:''
      })
      console.log(data)
    }).catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="mt-24 w-full md:w-[52%] m-auto">
      {post && (
        <div className="block  p-2 md:px-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className=" flex md:justify-end justify-center">
            {" "}
            Posted By:<b> {post.user.name}</b>{" "}
          </p>

          <h5 className="text-2xl mt-2  font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <div>
            <img src={BASE_URL + "/api/post/image/" + post.imageName} alt="" />
          </div>
          <p
            className="font-normal  text-gray-700 dark:text-gray-400 "
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
        </div>
      )}

      <div class="block mt-2  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="grid  mb-6 md:grid-cols-1">
          <div>
            <span className=" text-2xl">Comments</span>
            
            {post && post.comments.map((c) => <div className="block mt-2  p-2 bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"><h3>{c.content} </h3></div>)}
            <form>
              <input
                type="text"
                id="comments"
                class="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your comments"
                value={comment.content}
                onChange={(event)=>setComment({content:event.target.value})}
                required
              />

              <button
                type="submit"
                class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={submitPost}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
