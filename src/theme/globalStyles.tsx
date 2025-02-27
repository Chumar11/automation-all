// material
import { useTheme, alpha } from "@mui/material/styles";
import { GlobalStyles as GlobalThemeStyles } from "@mui/material";
import { createGradient } from "./palette";
// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();
  const isRTL = theme.direction === "rtl";

  return (
    <GlobalThemeStyles
      styles={{
        "*": {
          textDecoration: "none",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          width: "100%",
          fontFamily: isRTL
            ? "'Noto Kufi Arabic', sans-serif"
            : "'Inter', sans-serif",
          height: "100%",
        },

        "::-webkit-scrollbar": {
          // width: 8,
          // height: 8,
        },

        "::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 1px grey!important",
          background: "transparent",
        },

        "::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
          borderRadius: "4px!important",
        },

        "::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.primary.dark,
        },
        "#__next": {
          width: "100%",
          height: "100%",
        },

        // ".skeleton": {
        //   animation: "skeleton-loading 1s linear infinite alternate",
        // },

        // "@keyframes skeleton-loading": {
        //   "0%": {
        //     backgroundColor: theme.palette.common.neutral,
        //   },
        //   "100%": {
        //     backgroundColor: theme.palette.common.neutral,
        //   },
        // },

        // ".skeleton-text": {
        //   width: "100%",
        // },
        ".progress-bar": {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: theme.palette.warning.main,
          transformOrigin: "0%",
          zIndex: theme.zIndex.snackbar,
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        textarea: {
          "&::-webkit-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::-moz-placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          "&:-ms-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::placeholder": {
            color: theme.palette.text.disabled,
          },
        },

        ".slick-prev:before, .slick-next:before": {
          display: "none",
        },
        "& .auth-pages": {
          "& .gradient": {
            background: createGradient(
              theme.palette.primary.main,
              theme.palette.primary.dark
            ),
            width: "100%",
            borderRadius: "0 0 40px 40px",
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(16),
            "& .company-name": {
              marginTop:
                theme.direction === "rtl" ? theme.spacing(1) : theme.spacing(0),
              marginBottom:
                theme.direction === "rtl" ? theme.spacing(1) : theme.spacing(0),
            },
          },
          "& .card": {
            maxWidth: 560,
            margin: "auto",
            marginTop: "-80px",
            flexDirection: "column",
            justifyContent: "center",
            padding: theme.spacing(3, 3),
          },
          "& .password-card": {
            maxWidth: 560,
            margin: "auto",
            marginTop: "-80px",
            padding: theme.spacing(4),
            "& .full-width-btn": {
              marginTop: theme.spacing(1),
            },
          },
        },

        // ".slick-cloned": {
        //   display: "none!important",
        // },
      }}
    />
  );
}
