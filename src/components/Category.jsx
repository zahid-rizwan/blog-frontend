import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySelecton from "./CategorySelecton";
import Banner from "./Banner";
import { loadPostCategorywise } from "../services/post-service";
import NewFeed from "./NewFeed";

const Category = () => {
  const { categoryId } = useParams();
  const [currentPage,setCurrentPage] = useState(0);
  const [post, setPsot] = useState([]);
  useEffect(() => {
    console.log(categoryId);
    loadPostCategorywise(categoryId)
      .then((data) => {
        console.log(data);
        setPsot(data);
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, [categoryId]);
  return (
    <>
      <Banner />
      <CategorySelecton />
      {/* <NewFeed
       postContent={post}
       setPostContent={post}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage} /> */}
    </>
  );
};

export default Category;
