import React from "react";
import { Stack } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";
import { AuthContext } from "src/contexts/AuthContext";
// import { widgetMapping, WIX_APP_ID } from "src/config";
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 58,
  height: 36,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#bbb" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface IndexProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function index({ setOpen }: IndexProps) {
  const [checked, setChecked] = React.useState(false);
  const { user }: any = React.useContext(AuthContext);
  // console.log("user from subscription alert: ", user);
  const { wixInstanceId, widget_type } = user;
  // const key = widget_type as keyof typeof WIX_APP_ID;
  // const appId = WIX_APP_ID[key];
  // console.log(appId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("process.env.WIX_APPS", process.env.WIX_APPS);
    // setChecked(event.target.checked);
    const urlToOpen = `https://www.wix.com/apps/upgrade/${process.env.NEXT_PUBLIC_WIX_APP_ID}?appInstanceId=${wixInstanceId}`;
    window.open(urlToOpen, "_blank");
    setTimeout(() => {
      // to add delay in dialog box opeing
      setOpen(true);
    }, 3000);
    // setOpen(true);
  };

  // const widgets: { [key: string]: string } = {};
  // for (const [key, value] of Object.entries(widgetMapping)) {
  //   widgets[value] = key;
  // }

  const theme = useTheme();
  return (
    <Stack mb={3}>
      <Card
        sx={{
          display: "flex",
          // bgcolor: alpha(theme.palette.error.main, 0.1),
          borderColor: "secondary.dark",
          borderWidth: 1,
          p: 2,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <CardMedia
              component="img"
              sx={{ height: 150, width: 150, mx: "auto" }}
              image="/images/cartoon-rocket-launch.png"
              alt="Live from space album cover"
            />
            <Typography component="div" variant="h2" color="lime">
              Boost Conversions
            </Typography>
            {/* <Typography
              variant="h3"
              color="text.primary"
              component="div"
              fontWeight={400}
            >
              Add {widgets[user.widget_type]} Widget to your Wix Store by
              switching this to ON
            </Typography> */}
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              mt={1}
              justifyContent="center"
            >
              <Typography
                mt={0.3}
                fontWeight={600}
                variant="h6"
                color="text.primary"
              >
                OFF
              </Typography>
              <IOSSwitch
                sx={{ m: 1 }}
                // defaultChecked
                onChange={handleChange}
                checked={checked}
              />
              <Typography
                mt={0.3}
                fontWeight={600}
                variant="h6"
                color="text.primary"
              >
                ON
              </Typography>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Stack>
  );
}
