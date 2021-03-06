import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import avataLogo from "../images/shin.jpg";
import { useRouter } from "next/router";
import Link from "next/link";
import useApp from "../hooks/useApp";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../../modules/users/hooks/useLogout";
import Image from "next/image";
import CustomLink from "../components/CustomLink";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function MainLayout(props: IProps) {
  const { push } = useRouter();
  const { user } = useApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleLogout } = useLogout();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <AppBar position="static" style={{ display: "flex" }}>
        <Toolbar>
          <IconButton onClick={() => push("/")}>
            <Avatar src="https://pbs.twimg.com/profile_images/1252532485973577728/8Zy0Z8yV_400x400.jpg" />
          </IconButton>
          <Typography>My Blog</Typography>

          <div style={{ marginLeft: "auto" }}>
            <Stack direction={"row"} alignItems="center" spacing={10}>
              <CustomLink href="/posts">Posts</CustomLink>
              <CustomLink href="/news">News</CustomLink>
              <CustomLink href="/contact">Contact</CustomLink>
              {!user ? (
                <Link href={"/login"} passHref>
                  <span style={{ color: "#fff", cursor: "pointer" }}>
                    Login
                  </span>
                </Link>
              ) : (
                <Image
                  width={50}
                  height={50}
                  src={avataLogo as unknown as string}
                  onClick={handleAvatar}
                  alt=""
                ></Image>
              )}
            </Stack>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  push("/users/me");
                }}
              >
                <ListItemIcon>
                  <PersonIcon></PersonIcon>
                </ListItemIcon>
                <ListItemText>My profile</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon></LogoutIcon>
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
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
