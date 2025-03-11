import React, { useContext } from "react";
// styled
import { AuthContext } from "src/contexts/AuthContext";

import RootStyled from "./styled";
import IchonicLogo from "src/components/ichonic-logo-3.png";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import {
  Box,
  Stack,
  Button,
  List,
  ListItem,
  ListItemButton,
  Menu,
  Toolbar,
  IconButton,
  AppBar,
  Avatar,
  MenuItem,
  Divider,
  ListItemIcon,
  useTheme,
  Typography,
  ListItemText,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import { SettingsContext } from "../../contexts/SettingsContext";

import PaymentIcon from "@mui/icons-material/Payment";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useRouter } from "next/router";
import Image from "next/image";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Person, YoutubeSearchedFor } from "@mui/icons-material";
import { themColor } from "@/src/theme/themColor";

export default function DashboardMenu({ ...props }) {
  // const router = useRouter();
  const { pathname } = useRouter();
  const { state, actions } = useContext(SettingsContext);
  const { logout, isAuthenticated, user }: any = useContext(AuthContext);
  const menuData = [
    {
      title: "Dashboard",
      path: "/home",
      icon: <HomeRoundedIcon />,
    },
    ...(user?.role?.toLowerCase() === "admin"
      ? [
          {
            title: "Users",
            path: "/users",
            icon: <Person />,
          },
        ]
      : []),
    ,
    {
      title: "Automation",
      path: "/automation",
      icon: <WidgetsRoundedIcon />,
    },
    {
      title: "Youtube",
      path: "/youtube",
      icon: <YoutubeSearchedFor />,
    },
    // {
    //   title: "Widget",
    //   path: "/about",
    //   icon: <WidgetsRoundedIcon />,
    // },
    // {
    //   title: "Faqs",
    //   path: "/faqs",
    //   icon: <PaymentIcon />,
    // },
  ];
  console.log("user", user);
  const theme = useTheme();
  const {
    mainOpen,
    handleDrawerOpen,
    handleDrawerClose,
    drawerWidth,
    temporaryDrawerDrawerOpen,
  } = props;

  const [mode, setMode] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    setMode(state.themeMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.themeMode]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <RootStyled
      sx={{
        padding: "18px 12px",
        paddingBottom: "0px",
      }}
    >
      <Box>
        <Box
          // mt={"37px"}
          // disp
          // padding={'0px 12px'}
          display={"flex"}
          height={`auto`}
          justifyContent={"space-between"} // gap={`592px`}
          flexDirection={"column"}
        >
          <List>
            {menuData.map((value) => (
              <ListItem
                key={Math.random()}
                disablePadding
                className={`list-item ${
                  pathname === value?.path ? "active" : ""
                } ${
                  pathname.includes("update-widget") &&
                  value?.title === "Widget"
                    ? "active"
                    : ""
                } `}
                // sx={{
                //   // padding: "0px 12px",
                // }}
              >
                <ListItemButton
                  onClick={() => value?.path && router.push(value.path)}
                >
                  <ListItemIcon
                    sx={{
                      fill: "black",
                      filter: "invert(1)",
                      marginRight: "4px",
                      "& .css-17ceore-MuiSvgIcon-root": {
                        height: "17px",
                      },
                    }}
                  >
                    {value?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={value?.title}
                    sx={{ color: "black", fontSize: "0.9rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            sx={{
              backgroundColor: "transparent",
              color: themColor.secondary,
              border: `1px solid ${themColor.tertiary}`,
              fontSize: ".88rem",
              fontWeight: 400,
              padding: "1rem 0.99rem",
              "&:hover": {
                backgroundColor: themColor.white,
                borderColor: "#83a1b8",
              },
            }}
            variant="outlined"
            size="small"
            startIcon={<Logout />}
            onClick={() => {
              localStorage.clear();
              router.reload();
            }}
          >
            Logout
          </Button>
          {/* <List>
            <ListItem
              disablePadding
              sx={{ marginBottom: "16px" }}
              // direction="row" alignItems="center" spacing={1}
            >
              <ListItemButton
                onClick={() =>
                  actions.setThemeMode(mode === "dark" ? "light" : "dark")
                }
              >
                <ListItemIcon>
                  <IconButton
                    sx={{
                      svg: {
                        color: themColor.primary,
                      },
                      color: "white",
                      padding: "0px",
                      background: mode === "dark" ? "" : "white",
                    }}
                  >
                    {mode === "dark" ? (
                      <WbSunnyRoundedIcon />
                    ) : (
                      <DarkModeOutlinedIcon />
                    )}
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Theme" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ marginBottom: "16px" }}>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <IconButton
                    sx={{
                      padding: "0px",
                    }}
                    aria-controls={popoverOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={popoverOpen ? "true" : undefined}
                  >
                    <Avatar sx={{ width: "28px", height: "28px" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={popoverOpen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    bgcolor: "background.paper",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                // onClick={handleClose}
                >
                  <Avatar
                    alt={user?.email?.slice(0, 1)}
                    src={user?.email?.slice(0, 1)}
                  />
                  {user?.email}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    router.push("/auth/login");
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </ListItem>
          </List> */}
        </Box>
      </Box>
    </RootStyled>
  );
}
