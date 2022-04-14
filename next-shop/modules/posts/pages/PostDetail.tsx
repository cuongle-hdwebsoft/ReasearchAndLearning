import { Avatar, Button } from "@mui/material";
import { IPost } from "../interface/post";
import defaultImage from "../../../common/images/photo-1432821596592-e2c18b78144f.jpg";

const PostDetail = ({ post }: { post: IPost }) => {
  return (
    <div style={{ padding: 10 }}>
      <h1>Post detail</h1>
      <Avatar
        style={{ width: "100%", height: 300 }}
        variant="square"
        src={post.feature_image || ""}
      />
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        <span style={{ fontWeight: "bold" }}>Title:</span> {post.title}
      </p>
      <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
        <span style={{ fontWeight: "bold" }}>Author:</span> {post.authors}
      </p>
      <div
        className="post-detail__body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
      <Button
        type="button"
        variant="outlined"
        onClick={() => window.history.back()}
      >
        Back
      </Button>
    </div>
  );
};

export default PostDetail;
