import React, { useState } from "react";

import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = ({ postContent,setPostContent,currentPage,setCurrentPage }) => {
 
  const changePageInfinite = () =>{
    console.log("page Changed")
    setCurrentPage(currentPage+1)
  }
  return (
    <InfiniteScroll
    dataLength={postContent.content.length}
    next={changePageInfinite}
    hasMore={postContent.lastPage}
   
    >
      <div className="grid p-1  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {postContent.content.map((post, index) => (
        
        <Post post={post} key={index} />
      ))}
    </div>
    </InfiniteScroll>
  );
};

export default NewFeed;
