import { Button, TextareaAutosize } from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import useApp from "../../../common/hooks/useApp";
import usePostComment from "../hooks/usePostComment";

export default function CommentForm(props: { postId: string }) {
  const { handlePostComment } = usePostComment();
  const [value, setValue] = useState("");
  const { user } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      {user ? (
        <Button type="submit" variant="contained">
          Post
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          type="button"
          variant="contained"
        >
          Post
        </Button>
      )}
    </form>
  );
}
