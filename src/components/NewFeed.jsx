import React from "react";

import Post from "./Post";

const NewFeed = ({ postContent }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {postContent.content.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default NewFeed;
