import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadPost } from "../services/psot-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
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
  return (
    <div className="mt-24 w-full md:w-[52%] m-auto">
      {post && (
        <div
          className="block  p-2 md:px-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p className=" flex md:justify-end justify-center">
            {" "}
            Posted By:<b> {post.user.name}</b>  {" "}
            
          </p>

          <h5 className="text-2xl mt-2  font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <div>
            <img src={BASE_URL+'/post/image/'+post.immageName} alt="" />
          </div>
          <p className="font-normal  text-gray-700 dark:text-gray-400 " dangerouslySetInnerHTML={{__html:post.content}}>
            
          </p>
        </div>
      )}
    </div>
  );
};

export default PostPage;
