import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../components/Context/userContext";
import { loadPost, updatePost } from "../services/post-service";
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
  const object = useContext(userContext);
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });

    loadPost(blogId)
      .then((data) => {
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        toast.error("Error in loading the post");
      });
  }, [blogId]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setPost({
      ...post,
      categoryId: value,
    });
  };

  const updateBlogPost = (event) => {
    event.preventDefault();
    console.log(post);
    updatePost({ ...post, category: { categoryId: post.categoryId } }, post.id)
      .then((res) => {
        console.log(res);
        toast.success("Post Updated");
      })
      .catch((error) => {
        toast.error("Error in updating the post");
      });
  };

  const updateHtml = () => {
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="flex justify-center">
        <Card color="transparent" className="p-4 w-9/12">
          <Typography color="gray" className="mt-1 font-normal">
            Update your post
          </Typography>
          <form className="mt-8 mb-2 w-full" onSubmit={updateBlogPost}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Post Title
              </Typography>
              <Input
                size="lg"
                id="title"
                placeholder="Title"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={(event) => handleChange(event, "title")}
                value={post.title}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="title"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Post Content
              </Typography>

              <JoditEditor
                value={post.content}
                onChange={(newContent) =>
                  setPost({ ...post, content: newContent })
                }
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
                  value={post.categoryId.toString()}
                  label=""
                  name="categoryId"
                  onChange={handleCategoryChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                >
                  {categories.map((category) => (
                    <Option
                      value={category.categoryId.toString()}
                      key={category.categoryId.toString()}
                    >
                      {category.categoryTitle}
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
