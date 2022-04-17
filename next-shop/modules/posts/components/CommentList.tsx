import { Button } from "@mui/material";
import React from "react";
import useCommentsPost from "../hooks/useCommentsPost";
import Comment from "./Comment";

export default function CommentList(props: { postId: string }) {
  const { pages, fetchNextPage, hasNextPage } = useCommentsPost({
    postId: props.postId,
  });

  return (
    <>
      {pages.map((page) => {
        return page.data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ));
      })}
      <div style={{ textAlign: "center" }}>
        <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </Button>
      </div>
    </>
  );
}
