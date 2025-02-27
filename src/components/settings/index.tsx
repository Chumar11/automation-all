// react
import { useEffect, useRef, useState } from "react";

// next
import useTranslation from "next-translate/useTranslation";

// redux
import { useDispatch, useSelector } from "react-redux";
import { createBilling } from "src/redux/slices/product";
import { setLogout } from "src/redux/slices/user";

// motion
import { motion } from "framer-motion";

// material

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

// components
import LogoutIcon from "@mui/icons-material/Logout";
import ColorSetting from "./colorSetting";
import FullscreenSetting from "./fullscreenSetting";
import ThemeModeSetting from "./themeModeSetting";

// styles
import RootStyled from "./styled";

const useDimensions = ({ ...props }) => {
  const { ref } = props;
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref?.current.offsetWidth;
    dimensions.current.height = ref?.current.offsetHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions?.current;
};

export default function Settings({ ...props }) {
  const { isOpen, toggleOpen } = props;
  const { direction } = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ user }: { user: any }) => user);
  const [auth, setAuth] = useState(false);
  const { t } = useTranslation("common");
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const isRTL = direction === "rtl";
  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at ${
        isRTL ? "28px" : "272px"
      } 153px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: `circle(0px at ${isRTL ? "28px" : "272px"} 153px)`,
      transition: {
        delay: 0,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <RootStyled>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        {
          <motion.div className="motion-wrapper" variants={sidebar}>
            {isOpen && (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 2, pr: 1, pl: 2.5 }}
                >
                  <Typography variant="subtitle1">
                    {t("header.settings")}
                  </Typography>
                  <IconButton onClick={() => toggleOpen()}>
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Stack>
                <Divider />

                <Stack spacing={4} sx={{ p: 3 }}>
                  <Stack spacing={1.5} className="mode-wrapper">
                    <Typography variant="subtitle2">
                      {t("header.mode")}
                    </Typography>
                    <ThemeModeSetting />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">
                      {t("header.color")}
                    </Typography>
                    <ColorSetting />
                  </Stack>
                  <div>
                    <FullscreenSetting />
                    {auth && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                          localStorage.removeItem("token");
                          dispatch(setLogout());
                          dispatch(createBilling(null));
                          toggleOpen();
                        }}
                        className="logout-wrapper"
                      >
                        {t("header.logout")}
                      </Button>
                    )}
                  </div>
                </Stack>
              </>
            )}
          </motion.div>
        }
      </motion.nav>
    </RootStyled>
  );
}
