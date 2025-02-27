// react
import { useState } from "react";

// next
import useTranslation from "next-translate/useTranslation";

// material
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const { t } = useTranslation("common");
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? "primary" : "inherit"}
      startIcon={
        fullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />
      }
      onClick={toggleFullScreen}
      className={fullscreen ? "active" : ""}
    >
      {fullscreen ? t("header.exit-fullscreen") : t("header.fullscreen")}
    </Button>
  );
}
