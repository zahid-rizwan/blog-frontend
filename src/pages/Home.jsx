import React from "react";
import Banner from "../components/Banner";
import NewFeed from "../components/NewFeed";
import BlogPage from "../components/BlogPage";

// import BlogPage from "../components/BlogPage";

const Home = () => {
  return (
    <div>
      <Banner />    
      <div className=" max-w-[85rem] mx-auto">
        <BlogPage />
      </div>
    </div>
  );
};

export default Home;
