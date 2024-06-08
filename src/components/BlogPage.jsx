// import React, { useEffect, useState } from "react";
// import blogData from "../model/BlogData";
// import BlogCards from "./BlogCards";
import React from "react";
// import CategorySelecton from "./CategorySelecton";
import SideBar from "./SideBar";
// import { loadAllPosts } from "../services/psot-service";
import NewFeed from "./NewFeed";

import { loadAllPosts } from "../services/psot-service";

import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
const BlogPage = () => {
  //   const [blogs, setBlogs] = useState(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const pageSize = 12;
  //   const [selectedCategory, setSelectedCategory] = useState(null);
  //   const [activeCategory, setActiveCategory] = useState(null);
  //   useEffect(()=>{
  //     loadAllPosts().then((data)=>{
  //       setBlogs(data)
  //     }).catch(error=>{
  //       console.log(error);
  //     })
  //   },[])
  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };
  //   const handleCategoryChange = (category) => {
  //     setSelectedCategory(category);
  //     setCurrentPage(1);
  //     setActiveCategory(category);

  //   };
 
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    loadAllPosts(0, 15)
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

  return (
    <div>
      <div>
        {/* <CategorySelecton
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
        /> */}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <NewFeed
        postContent={postContent}
        />
        {/* <BlogCards
          blogs={blogs}
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          pageSize={pageSize}
        /> */}
        <div className=" w-2/5">
          <SideBar postContent={postContent} />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Pagination postContent={postContent} setPostContent={setPostContent}/>
      </div>
    </div>
  );
};

export default BlogPage;
