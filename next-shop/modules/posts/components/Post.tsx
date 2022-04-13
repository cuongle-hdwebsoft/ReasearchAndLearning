import { Avatar, Paper } from "@mui/material";
import React from "react";
import { IPost } from "../interface/post";
import Image from "next/image";

export default function Post(props: { post: IPost }) {
  return (
    <div className="post">
      <Paper sx={{ padding: 1 }}>
        <div className="post__wrap-img">
          <Avatar
            className="post__img"
            variant="square"
            src={props.post.feature_image.toString()}
            alt={props.post.title}
          />
        </div>
        <div className="post__content">
          <div className="post__title">{props.post.title}</div>
          <div className="post__author">Author: {props.post.authors}</div>
          <div className="post__category">Category: {props.post.tags.name}</div>
        </div>
      </Paper>
    </div>
  );
}
