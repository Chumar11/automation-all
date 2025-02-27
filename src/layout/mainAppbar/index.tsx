// drawer..............................
// import Drawer from "src/theme/overrides/drawer";
// react
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
// material
import {
  Toolbar,
  Stack,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  useTheme,
  Typography,
  Zoom,
  Button,
  Box,
  Grid,
} from "@mui/material";

import RootStyled from "./styled";
import { useMutation } from "react-query";

import * as api from "src/services";

import { AuthContext } from "src/contexts/AuthContext";
import { toast } from "react-hot-toast";
// import { WIX_APP_ID } from "src/config";
// import MultiStepProgressBar from "../MultiSteperProgress/MultiStepProgressbar";
import { themColor } from "@/src/theme/themColor";
import { Logout } from "@mui/icons-material";
// import { themColor } from "@/src/theme/themColor";

// import LoadingButton from "src/theme/overrides/loadingButton";
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

function MainNavbar({ ...props }) {
  const [step, setStep] = useState(0);
  const [loading, setloading] = useState(false);
  const { data, isLoading } = props;
  const [Loading, setLoading] = useState(true);
  const [state, setState] = useState<any>({
    ...data,
    // widgetSize: 60,
  });

  const handleSave = () => {
    if (step === 0) {
      let error = false;
      if (!error) {
        if (!state.popupText) {
          toast.error("Popup Title is required");
          error = true;
          setloading(false);
        } else if (!state.popupdesc) {
          toast.error("Popup description is required");
          error = true;
          setloading(false);
        }
      }
      if (state.person.length > 0) {
        for (let i = 0; i < state.person.length; i++) {
          const per = state.person[i];
          if (!per.personTitle) {
            toast.error(`Person Title is required in Person # ${per.id} `);
            error = true;
            setloading(false);
            break;
          } else if (!per.personDesc) {
            toast.error(`Description is required in Person # ${per.id}`);
            error = true;
            setloading(false);
            break;
          } else if (!per.desktopLink || !per.mobileLink) {
            toast.error("Whatsapp Phone Link is required");
            error = true;
            setloading(false);
            break;
          }
        }
      }
      if (!error) setStep(1);
    } else {
      setloading(true);
      if (state.widgetType === "Contact Form") {
        const { contactformSettings, ...others } = state;
        mutate({ ...others, widget: user.widget_type });
      } else {
        // if (state.desktopLink === "" || state.mobileLink === "") {
        //   toast.error("Phone Number is required");
        //   setloading(false);
        // } else
        mutate({ ...state, widget_type: user.widget_type });
      }
      // Contactformsetting
    }
  };
  const { mutate: mutateUpdateContactForm } = useMutation(
    api.updateContactFormSettings,
    {
      onSuccess: () => {
        setloading(false);
        toast.success("Setting Updated");
      },
      onError: (err: any) => {
        setloading(false);

        toast.error("something went wrong");
      },
    }
  );
  const { mutate: mutateCreateContactForm } = useMutation(
    api.createContactFormSettings,
    {
      onSuccess: () => {
        setloading(false);
        toast.success("Setting Updated");
      },
      onError: (err: any) => {
        setloading(false);

        toast.error("something went wrong");
      },
    }
  );

  const { mutate } = useMutation(api.saveWidgetSettings, {
    onSuccess: (data) => {
      if (state.widgetType === "Contact Form") {
        if (data.contactformSettings) {
          mutateUpdateContactForm({
            ...state.contactformSettings,
          });
        } else {
          mutateCreateContactForm({
            ...state.contactformSettings,
            userId: state.agentId,
          });
        }
      } else {
        setloading(false);
        toast.success("Setting Updated");
      }
    },
    onError: (err: any) => {
      setloading(false);

      toast.error("something went wrong");
    },
  });

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
  // const { themeMode } = useSelector(
  //   ({ settings }: { settings: any }) => settings
  // );
  // const { sactions } = useContext(SettingsContext);
  const { logout, isAuthenticated, user }: any = useContext(AuthContext);
  // const widgetId = WIX_APP_ID[user?.widget_type as keyof typeof WIX_APP_ID];

  React.useEffect(() => {
    setMode(state.themeMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.themeMode]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  var page = "";
  const nextPageNumber = () => {};

  return (
    <RootStyled
      // drawerWidth={drawerWidth}
      sx={{
        position: "sticky",
        top: 0,
        ...(mainOpen && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          [theme.breakpoints.down("lg")]: {
            width: " 100% ",
            marginLeft: 0,
          },
        }),
      }}
    >
      <Toolbar
        style={{ justifyContent: "space-between", padding: "16px" }}
        disableGutters
        className="toolbar"
      >
        <IconButton
          aria-label="open drawer"
          onClick={mainOpen ? handleDrawerClose : handleDrawerOpen}
          edge="start"
          sx={{
            color: themColor.primary,
            zIndex: "99999",
            display: { xs: "none", md: "flex" },
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          aria-label="open drawer"
          onClick={temporaryDrawerDrawerOpen}
          edge="start"
          sx={{
            color: themColor.primary,
            zIndex: "99999",
            display: { xs: "flex", md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
        // sx={{
        //   top: "0",
        //   left: "0",
        //   display: "flex",
        //   position: "fixed",
        //   width: "100%",
        //   flexBasis: "100%",
        //   flex: "1",
        //   background: "#fff",
        //   height: "72px",
        //   alignItems: "center",
        //   zIndex: 3,
        //   padding: "1rem 1.5rem",
        //   justifyContent: "space-between",
        //   gap: "20px",
        // }}
        >
          {/* <NewProgressBar onPageNumberClick={nextPageNumber} page={page} /> */}
        </Box>
        {/* Checking if user plan is free or not */}
        {/* {user?.plan !== "free" && (
          <Typography
            variant="h4"
            style={{ paddingLeft: "12%" }}
            sx={{
              color: themColor.primary,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Your feedback powers our growth. Please{" "}
            <Link
              href={`https://www.wix.com/app-market/add-review/${widgetId}`}
              target="_blank"
              color="secondary"
              rel="noopener noreferrer"
            >
              Review our App
            </Link>
            ! 😍
          </Typography>
        )} */}
        {/* <Stack direction={"row"} gap={1}>
          <Zoom in={Boolean(step)}>
            <Button
              sx={{ right: "100px", zIndex: "999" }}
              onClick={() => setStep(0)}
              variant="contained"
              color={"error"}
              size="large"
            >
              back
            </Button>
          </Zoom>
          <LoadingButton
            sx={{ position: "fixed" }}
            loading={loading}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSave}
          >
            {step === 0 ? "Next" : "Submit"}
          </LoadingButton>
        </Stack> */}
        {user?.plan === "free" && (
          <Grid item>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: themColor.primary,
                border: `1px solid ${themColor.primary}`,
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
          </Grid>
        )}
      </Toolbar>
    </RootStyled>
  );
}
export default MainNavbar;
