import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getFileView, uploadFile } from "@/lib/appwrite/uploadImage";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  console.log(formData);

  const [UpdatePostError, setUpdatePostError] = useState(null);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setUpdatePostError(data.message);
          return;
        }
        if (res.ok) {
          setUpdatePostError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        toast({ title: "Please select an image!" });
        return;
      }
      setImageUploading(true);
      setImageUploadError(null);
      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFileView(uploadedFile.$id);
      setFormData({ ...formData, image: postImageUrl });
      toast({ title: "Image Uploaded Successfully!" });
      if (postImageUrl) {
        setImageUploading(false);
      }
    } catch (error) {
      setImageUploadError("Image upload failed");
      console.log(error);
      toast({ title: "Image upload failed" });
      setImageUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Smething went wrong! Please try again." });
        setUpdatePostError(data.message);
        return;
      }
      if (res.ok) {
        toast({ title: "Article published Successfully." });
        setUpdatePostError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast({ title: "Smething went wrong! Please try again." });
      setUpdatePostError("Smething went wrong! Please try again.");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Edit Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            value={formData.category}
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
                <SelectItem value="crimenews">Crime News</SelectItem>
                <SelectItem value="politicsnews">Politics News</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-[#000e4a] hover:bg-rose-500"
            onClick={handleUploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="W-full h-96 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something here..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />
        <Button
          type="submit"
          className="h-12 bg-[#111368] font-semibold hover:bg-rose-500 max-sm:mt-5 text-md"
        >
          Update Your Article
        </Button>
        {UpdatePostError && (
          <p className="text-red-600 mt-5">{UpdatePostError}</p>
        )}
      </form>
    </div>
  );
};
export default EditPost;
