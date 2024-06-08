import React from "react";
import { loadAllPosts } from "../services/psot-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, IconButton } from "@material-tailwind/react";


export function Pagination({postContent,setPostContent}) {
  console.log("pagination")
  const [active, setActive] = useState(1);
  const changePage=(pageNumber=0,pageSize=10)=>{
    loadAllPosts(pageNumber,pageSize).then((data)=>{
      setPostContent(data)
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

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => changePage(--postContent.pageNumber)}
        disabled={postContent.pageNumber == 0}
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(postContent.totalPages)].map((item, index) => (
          <IconButton
            {...getItemProps(index + 1)}
            key={index}
            onClick={() => changePage(index, 10)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => changePage(++postContent.pageNumber)}
        disabled={postContent.lastPage}
      >
        Next
      </Button>
    </div>
  );
}
