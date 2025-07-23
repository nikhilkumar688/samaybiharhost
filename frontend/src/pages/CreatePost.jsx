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
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  const [createPostError, setCreatePostError] = useState(null);

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
      const postImaageUrl = getFileView(uploadedFile.$id);
      setFormData({ ...formData, image: postImaageUrl });
      toast({ title: "Image Uploaded Successfully!" });
      if (postImaageUrl) {
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
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Smething went wrong! Please try again." });
        setCreatePostError(data.message);
        return;
      }
      if (res.ok) {
        toast({ title: "Article published Successfully." });
        setCreatePostError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast({ title: "Smething went wrong! Please try again." });
      setCreatePostError("Smething went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-yellow-50 to-rose-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-10">
        <h1 className="text-center text-3xl my-7 font-bold text-slate-800">
          Create a Post
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
            />
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
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

          <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3 bg-white rounded-md">
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

          {imageUploadError && (
            <p className="text-red-600">{imageUploadError}</p>
          )}

          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          )}

          <ReactQuill
            theme="snow"
            placeholder="Write Something here..."
            className="h-72 mb-12 bg-white rounded-md"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />

          <Button
            type="submit"
            className="h-12 bg-[#111368] font-semibold hover:bg-rose-500 text-white text-md"
          >
            Publish Your Article
          </Button>

          {createPostError && (
            <p className="text-red-600 mt-5">{createPostError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
