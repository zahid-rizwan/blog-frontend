import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import { getCurrentUser } from "../auth";
import { toast } from "react-toastify";

export function AddPost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log(getCurrentUser());
    setUser(getCurrentUser());
    // console.log(user)
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleCategoryChange = (value) => {
    console.log("Selected Category ID:", value);
    setPost({ ...post, categoryId: value });
  };

  const handleContentChange = (newContent) => {
    setPost({ ...post, content: newContent });
    setContent(newContent);
  };
  const createPost = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    if (post.title.trim() == "") {
      alert("post title is required");

      return;
    }
    if (post.content.trim() === "") {
      alert("post content is required");
      return;
    }
    if (post.categoryId.trim() === "") {
      alert("category is required");
      return;
    }
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {

        uploadPostImage(image,data.id).then(data=>{
          toast.success("image uploaded")
        }).catch(error=>{
          toast.error("image not uploaded ")
        })
        toast.success("Post Created");
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("Post not created");
      });
  };
  const handleImageChamge =(event)=>{

    setImage(event.target.files[0])
  }
  return (
    <Card color="transparent" className="p-4 w-9/12">
      <Typography color="gray" className="mt-1 font-normal">
        Create Your post
      </Typography>
      <form className="mt-8 mb-2 w-full" onSubmit={createPost}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Post Title
          </Typography>
          <Input
            size="lg"
            id="title"
            placeholder="title"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={fieldChange}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={post.title}
            name="title"
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Post Content
          </Typography>

          <JoditEditor
            ref={editor}
            value={post.content}
            onChange={handleContentChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Image
          </Typography>
          <Input
            type="file"
            size="lg"
            id="file"
            onChange={handleImageChamge}
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
          Post
        </Button>
      </form>
    </Card>
  );
}
