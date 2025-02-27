import { useState, useContext } from "react";
// next
import { useRouter } from "next/router";
import { styled, useTheme } from "@mui/material/styles";
import { Fab, Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// redux
// ----------------------------------------------------------------------
import MainNavbar from "./mainAppbar";
import RootStyled from "./styled";
import DashboardMenu from "./dashboardMenu";
import { AuthContext } from "src/contexts/AuthContext";
import { themColor } from "../theme/themColor";
// import { themColor } from "../theme/themColor";

const drawerWidth = 182;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: `0px`,
    },
  }),
}));

export default function MainLayout({ ...props }) {
  const { children, state, setState } = props;
  const theme = useTheme();
  const { pathname } = useRouter();
  const [open, setOpen] = useState(true);
  const { isInitialized, isAuthenticated }: any = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [temporaryDrawer, settemporaryDrawer] = useState(false);

  const temporaryDrawerDrawerOpen = () => {
    settemporaryDrawer(true);
  };

  const temporaryDrawerDrawerClose = () => {
    settemporaryDrawer(false);
  };
  const isWedget = pathname.includes("/widget");

  if ((!isAuthenticated && isInitialized) || isWedget) {
    return children;
  }
  return (
    <RootStyled>
      <MainNavbar
        mainOpen={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
        temporaryDrawerDrawerOpen={temporaryDrawerDrawerOpen}
        state={state}
        setState={setState}
      />
      <Drawer
        variant="temporary"
        open={temporaryDrawer}
        onClose={temporaryDrawerDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          zIndex: 9999,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor:
              theme.palette.mode === "light"
                ? theme.palette.background.paper
                : theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,

            // ? theme.palette.background.paper
            // : theme.palette.background.default,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={temporaryDrawerDrawerClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <DashboardMenu />
      </Drawer>
      <Drawer
        sx={{
          display: { xs: "none", lg: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#fff",
            // gap: "29px",
            borderRight: `1px solid ${themColor.ghost}`,
            // bgcolor:
            //   theme.palette.mode === "light"
            //     ? theme.palette.common.black
            //     : theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          sx={{ borderBottom: `1px solid ${themColor.ghost}` }}
        >
          <img
            src="/images/image.png"
            alt="Ichonic Logo"
            width={170}
            style={{
              width: "180px !important",
              // height: "71px",
              paddingBottom: "18px",
              paddingTop: "18px",
            }}
          />
        </Box>
        <DashboardMenu />
      </Drawer>
      <Main
        open={open}
        // state={state}
        // setState={setState}
        className="layout-children"
      >
        {children}
      </Main>
      <Box className="children-height" />
    </RootStyled>
  );
}
