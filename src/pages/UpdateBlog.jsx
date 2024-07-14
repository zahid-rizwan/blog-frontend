import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../components/Context/userContext";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import JoditEditor from "jodit-react";

const UpdateBlog = () => {
  const { blogId } = useParams();
  console.log(blogId);
  const object = useContext(userContext);
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
   



  const navigate = useNavigate();
 
  useEffect(() => {

    loadAllCategories()
    .then((data) => {
      // console.log(data);
      setCategories(data);
    })
    .catch((error) => {
      console.log(error);
    });
    loadPost(blogId)
      .then(data => {
        console.log(data.user.id)
        setPost({...data})
      })
      .catch((error) => {
        toast.error("error in loading the post");
      });
  }, []);

  useEffect(() => {
    if (post && post.user.id !== object?.user.data.id) {
        toast.error("Not your post");
        navigate("/");
      }
  }, [post]);
  console.log(post)
  console.log(post?.user.id)
  console.log(object?.user.data.id)
  const updateHtml = () => {
    return (
      <div className="flex justify-center">
      <Card color="transparent" className="p-4 w-9/12">
        <Typography color="gray" className="mt-1 font-normal">
          Update your post
        </Typography>
        <form className="mt-8 mb-2 w-full" onSubmit={""}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Post Title
            </Typography>
            <Input
              size="lg"
              id="title"
              placeholder="title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={""}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              // value={post.title}
              name="title"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Post Content
            </Typography>

            <JoditEditor
              // ref={editor}
              // value={post.content}
              onChange={""}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Image
            </Typography>
            <Input
              type="file"
              size="lg"
              id="file"
              onChange={""}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="file"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Category
            </Typography>
            <div className="">
              <Select
                label=""
                // onChange={handleCategoryChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              >
                {categories.map((category) => (
                  <Option
                    // value={category.categoryId.toString()}
                    // key={category.categoryId.toString()}
                  >
                    {/* {category.categoryTitle} */}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Update Post
          </Button>
        </form>
      </Card>
      </div>
    );
  };
  return <div>{updateHtml()}</div>;
};

export default UpdateBlog;
