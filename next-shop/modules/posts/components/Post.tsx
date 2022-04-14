import { Avatar, Paper } from "@mui/material";
import React from "react";
import { IPost } from "../interface/post";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Post(props: { post: IPost }) {
  const route = useRouter();

  return (
    <div onClick={() => route.push("/posts/" + props.post.id)} className="post">
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
          <div className="post__author">
            <span>Author:</span> {props.post.authors}
          </div>
          <div className="post__category">
            <span>Category:</span> {props.post.tags.name}
          </div>
        </div>
      </Paper>
    </div>
  );
}
