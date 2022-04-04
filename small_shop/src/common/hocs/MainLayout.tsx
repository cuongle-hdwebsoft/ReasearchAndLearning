/** @jsxImportSource @emotion/react */

import React, { Suspense, useState } from "react";
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
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import logo from "../../logo.svg";
import { AppContext } from "../context/app";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";
import { useAppContextHook } from "../../modules/app/hook";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { css } from "@emotion/react";
import Loading from "../components/Loading";

import vi from "../images/vi.png";
import en from "../images/en.png";

const appBarHeight = "66px";
const drawerWidth = "200px";

interface IProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function MainLayout(props: IProps) {
  const history = useHistory();
  const appContext = useAppContextHook();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);

  const handleClickMenu = (key: string) => {
    history.push("/" + key);
  };

  const renderListMenu = () =>
    routes.map((item) => (
      <ListItem key={item.key} disablePadding>
        <ListItemButton onClick={() => handleClickMenu(item.key)}>
          <ListItemIcon
            css={css`
              padding: 0px;
              margin: 0px;
              min-width: 40px;
            `}
          >
            {<item.Icon></item.Icon>}
          </ListItemIcon>
          <ListItemText>{t(item.name)}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));

  const handleLogout = () => {
    appContext.setIsLogin(false);
    localStorage.clear();
    history.push("/login");
    enqueueSnackbar("Logout successful", { variant: "success" });
  };

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
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppContext.Consumer>
            {(context) => (
              <>
                <IconButton onClick={context.toggleLang}>
                  <Avatar style={{ width: 30, height: 30 }} src={context.lang === "vi" ? vi : en}></Avatar>
                </IconButton>
                <IconButton onClick={context.toggleTheme} size="large">
                  <LightModeIcon></LightModeIcon>
                </IconButton>
              </>
            )}
          </AppContext.Consumer>
          <IconButton
            aria-expanded={open}
            aria-controls={open ? "menu-account" : undefined}
            aria-haspopup={true}
            id="account-button"
            size="large"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
          >
            <AccountCircleIcon></AccountCircleIcon>
          </IconButton>
          <Menu
            id="menu-account"
            MenuListProps={{
              "aria-labelledby": "account-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountBoxIcon></AccountBoxIcon>
              </ListItemIcon>
              My profile
            </MenuItem>
            <MenuItem></MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <PowerSettingsNewIcon></PowerSettingsNewIcon>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          top: appBarHeight,
          position: "absolute",
          minHeight: `calc(100vh - ${appBarHeight})`,
          left: 0,
          width: "100%",
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
          }}
          anchor="left"
          open={false}
        >
          <List sx={{ minHeight: `calc(100vh - ${appBarHeight})` }}>{renderListMenu()}</List>
        </Drawer>
        <Box
          sx={{
            minHeight: `calc(100vh - ${appBarHeight})`,
            width: "100%",
            padding: 2,
            backgroundColor: (props) => props.palette.background.paper,
          }}
        >
          <Suspense fallback={<Loading></Loading>}>{props.children}</Suspense>
        </Box>
      </Box>
    </Box>
  );
}
