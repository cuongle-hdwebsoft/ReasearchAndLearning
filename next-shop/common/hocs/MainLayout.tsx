import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../public/vercel.svg";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function MainLayout(props: IProps) {
  return (
    <div>
      <AppBar position="static" style={{ display: "flex" }}>
        <Toolbar>
          <IconButton>
            <Avatar src="https://pbs.twimg.com/profile_images/1252532485973577728/8Zy0Z8yV_400x400.jpg" />
          </IconButton>
          <Typography>My Blog</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: 2,
          width: "80%",
          margin: "5px auto 0px auto",
          backgroundColor: "#fff",
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
