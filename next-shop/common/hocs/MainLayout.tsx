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
            <Avatar src={logo} />
          </IconButton>
          <Typography>My Blog</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3, width: "60%", margin: "auto" }}>
        {props.children}
      </Box>
    </div>
  );
}
