import { Button, TextareaAutosize } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import usePostComment from "../hooks/usePostComment";

export default function CommentForm(props: { postId: string }) {
  const { handlePostComment } = usePostComment();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(123);
    handlePostComment(value, props.postId, setValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        onChange={(e) => setValue(e.target.value)}
        minRows={5}
        placeholder="Write your own comment here....."
        style={{ width: "100%", padding: 10 }}
        value={value}
      ></TextareaAutosize>
      <Button type="submit" variant="contained">
        Post
      </Button>
    </form>
  );
}
