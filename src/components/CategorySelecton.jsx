import React, { useEffect, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { NavLink } from "react-router-dom";

const CategorySelecton = ({
  // onSelectCategory,
  // selectedCategory,
  // activeCategory,
}) => {
  const[categories,setCategories] = useState([])
  useEffect(()=>{
    loadAllCategories().then(data=>{
      setCategories([...data])
    }).catch(error=>{
      console.log(error)
      toast.error("error in loading categories")
    })
  },[])
  // const categories = ["Startups", "Security", "AI", "Apps", "Tech"];
  return (
    <div className='px-4 mb-8 lg:space-x-16 flex flex-warp border-b-2 py-5 text-gray-900 font-semibold'>
      <NavLink to={'/'}>
      <button
      //  onClick={()=> onSelectCategory(null)}
      //   className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}
        >All</button>
      </NavLink>
      {categories && categories.map((category,index) => (
        <NavLink to={'/categories/'+category.categoryId}>
          <button
          //   onClick={()=> onSelectCategory(category)}
          // className={`mr-2 space-x-16 ${
          //   activeCategory === category ? "active-button" : ""
          // }`}
          key={index}
        >
          {category.categoryTitle}
        </button>
        </NavLink>
      ))}
    </div>
  );
};

export default CategorySelecton;
