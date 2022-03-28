import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";

import logo from "../../logo.svg";
import { AppContext } from "../context/app";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";

const appBarHeight = "65px";
const drawerWidth = "250px";

interface IProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function MainLayout(props: IProps) {
  const history = useHistory();

  const handleClickMenu = (key: string) => {
    history.push("/" + key);
  };

  const renderListMenu = () =>
    routes.map((item) => (
      <ListItem key={item.key} disablePadding>
        <ListItemButton divider onClick={() => handleClickMenu(item.key)}>
          <ListItemIcon>
            <MenuIcon></MenuIcon>
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));

  return (
    <Box>
      <AppBar
        sx={{
          flexDirection: "row",
          alignItems: "center",
          height: {
            xl: appBarHeight,
          },
        }}
        position="absolute"
        color="default"
      >
        <Toolbar>
          <IconButton size="large">
            <Avatar src={logo} />
          </IconButton>
        </Toolbar>
        <Typography
          noWrap
          component="div"
          style={{ fontWeight: "bold" }}
          sx={{
            fontSize: {
              xl: 20,
            },
            color: (theme) => {
              if (theme.palette.mode === "dark") {
                return "white";
              } else {
                return "black";
              }
            },
          }}
        >
          Small shop
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            paddingRight: 2,
          }}
        >
          <AppContext.Consumer>
            {(context) => (
              <>
                <IconButton onClick={context.toggleTheme} size="large">
                  <LightModeIcon></LightModeIcon>
                </IconButton>
              </>
            )}
          </AppContext.Consumer>
          <IconButton size="large">
            <AccountCircleIcon></AccountCircleIcon>
          </IconButton>
        </Box>
      </AppBar>
      <Box>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            height: "calc(100% - 66px)",
            position: "absolute",
          }}
          anchor="left"
          open={false}
        >
          <List>{renderListMenu()}</List>
        </Drawer>
        <Box
          sx={{
            position: "absolute",
            top: 66,
            left: 250,
            padding: 1,
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
