import { Paper } from "@mui/material";
import React from "react";
import { IPost } from "../interface/post";

export default function Post(props: { post: IPost }) {
  return (
    <div className="post">
      <Paper sx={{ padding: 1 }}>
        <div className="post__wrap-img">
          <img
            src={props.post.feature_image.toString()}
            alt={props.post.title}
          />
        </div>
        <div className="post__content">
          <div className="post__title">{props.post.title}</div>
          {/* <div className="post__description">{props.post.excerpt}</div> */}
          <div className="post__author">
            Author: {props.post.authors[0].name}
          </div>
          <div className="post__category">
            Category: {props.post.tags.map((tag) => tag.name).join(", ")}
          </div>
          {/* <div className="post__buttons">
            <Button className="button__read-more" variant="contained">
              Read more
            </Button>
          </div> */}
        </div>
      </Paper>
    </div>
  );
}
