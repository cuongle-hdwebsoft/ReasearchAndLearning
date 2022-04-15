import {
  Avatar,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { IPost } from "../interface/post";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Comment from "../components/Comment";
import { useRouter } from "next/router";
import { IComment } from "../interface/comment";
import CommentForm from "../components/CommentForm";
import useCommentsPost from "../hooks/useCommentsPost";

const PostDetail = ({ post }: { post: IPost }) => {
  const router = useRouter();
  const { comments } = useCommentsPost({ postId: post.id });

  return (
    <div style={{ padding: 10 }}>
      <h1 id="#">Post detail</h1>
      <Avatar
        style={{ width: "100%", height: 300 }}
        variant="square"
        src={post?.feature_image || ""}
      />
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        <span style={{ fontWeight: "bold" }}>Title:</span> {post?.title}
      </p>
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        <span style={{ fontWeight: "bold" }}>Author:</span> {post?.authors}
      </p>
      <div
        className="post-detail__body"
        dangerouslySetInnerHTML={{ __html: post?.html }}
      ></div>

      <div id="cmt">
        <h2>Comments</h2>

        {/* {Array.from({ length: 6 }).map((cmt, index) => (
          <Comment  key={index}></Comment>
        ))} */}
        <div style={{ marginBottom: 10 }}>
          <CommentForm postId={post.id}></CommentForm>
        </div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        <div style={{ textAlign: "center" }}>
          <Button>Load more</Button>
        </div>
      </div>

      <Button type="button" variant="outlined" onClick={() => router.push("/")}>
        Back
      </Button>

      <SpeedDial
        open={true}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={
            <InsertCommentIcon
              onClick={() => {
                window.location.href = "#cmt";
              }}
            ></InsertCommentIcon>
          }
          tooltipTitle="View comment"
        ></SpeedDialAction>
        <SpeedDialAction
          icon={
            <ArrowCircleUpIcon
              onClick={() => {
                window.location.href = "#";
              }}
            ></ArrowCircleUpIcon>
          }
          tooltipTitle="Back to top"
        ></SpeedDialAction>
      </SpeedDial>
    </div>
  );
};

export default PostDetail;
