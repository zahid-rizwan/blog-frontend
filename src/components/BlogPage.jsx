// import React, { useEffect, useState } from "react";
// import blogData from "../model/BlogData";
// import BlogCards from "./BlogCards";
import React from "react";
import CategorySelecton from "./CategorySelecton";
import SideBar from "./SideBar";
// import { loadAllPosts } from "../services/psot-service";
import NewFeed from "./NewFeed";

import { loadAllPosts } from "../services/post-service";

import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
const BlogPage = () => {
  const [currentPage,setCurrentPage] = useState(0);
  const [active, setActive] = useState(1);

  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });



  useEffect(()=>{
    changePage(currentPage)
  },[currentPage])
  const changePage=(pageNumber=0,pageSize=10)=>{

    loadAllPosts(pageNumber,pageSize).then((data)=>{
      setPostContent({
        content: [...postContent.content,...data.content],
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        pageSize: data.pageSize,
        lastPage: data.lastPage,
        pageNumber: data.pageNumber,
      })
      setActive(pageNumber+1)
    }).catch(error=>{
      toast.error("Error in loading posts")
    })
  }

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });
 
  

  useEffect(() => {
    loadAllPosts(0, 5)
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
        <CategorySelecton
          // onSelectCategory={handleCategoryChange}
          // selectedCategory={selectedCategory}
          // activeCategory={activeCategory}
        />
      </div>
      <div className="flex flex-col mt-5 pt-2 lg:flex-row gap-8">
        <NewFeed
        postContent={postContent}
        setPostContent={setPostContent}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
