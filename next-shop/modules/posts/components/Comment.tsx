import { Avatar, Card } from "@mui/material";
import React from "react";
import { IComment } from "../interface/comment";

export default function Comment(props: { comment: IComment }) {
  return (
    <div className="comment">
      <Card elevation={3} style={{ padding: 10 }}>
        <div className="comment__wrap-avata">
          <Avatar
            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
            alt=""
          >
            {" "}
          </Avatar>
          <strong className="comment__author">
            {props.comment.authorName}
          </strong>
          <p style={{ marginLeft: "auto" }}>{props.comment.dateTime}</p>
        </div>
        <p className="comment__description">{props.comment.comment}</p>
      </Card>
    </div>
  );
}
