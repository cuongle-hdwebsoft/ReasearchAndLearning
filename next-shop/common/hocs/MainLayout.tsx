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
import logo from "../images/8264.jpg";
import { useRouter } from "next/router";
import Link from "next/link";
import useApp from "../hooks/useApp";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../../modules/users/hooks/useLogout";

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
            <Stack>
              {!user ? (
                <Link href={"/login"} passHref>
                  <span style={{ color: "#fff", cursor: "pointer" }}>
                    Login
                  </span>
                </Link>
              ) : (
                <Avatar
                  src={logo as unknown as string}
                  onClick={handleAvatar}
                ></Avatar>
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
