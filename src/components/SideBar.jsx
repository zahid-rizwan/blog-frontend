import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
// import blogData from "../model/BlogData";

const SideBar = ({postContent}) => {
  // Slice the blogData array to get latest and popular blogs
  const latestBlogs = postContent.content.slice(0, 5);
  const popularBlogs = postContent.content.slice(6, 11);

  return (
    <div className=" w-full">
      <div>
        <h3 className="text-2xl font-semibold px-4 ">Latest Blogs</h3>
        <div>
          {latestBlogs.map((blog) => (
            <div
              key={blog.id}
              className="my-5 border-b-2 border-b-sky-600 border-spacing-2 px-4"
            >
              <h4 className="font-medium mb-2">{blog.title}</h4>
              <Link
                to="/"
                className="text-base pb-2 hover:text-green-500 inline-flex items-center"
              >
                Read more <FaArrowRight className="mt-2 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold px-4 mt-20">Popular Blogs</h3>
        <div>
          {popularBlogs.map((blog) => (
            <div
              key={blog.id}
              className="my-5 border-b-2 border-b-sky-600 border-spacing-2 px-4"
            >
              <h4 className="font-medium mb-2">{blog.title}</h4>
              <Link
                to="/"
                className="text-base pb-2 hover:text-green-500 inline-flex items-center"
              >
                Read more <FaArrowRight className="mt-2 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
