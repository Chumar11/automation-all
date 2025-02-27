// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            borderRadius: "3px 3px 0px 0px",
            height: "3px",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: "0 10px",
          minWidth: 48,
          fontWeight: theme.typography.fontWeightMedium,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          "&:not(:last-of-type)": {
            marginRight: theme.spacing(2),
          },
        },
        labelIcon: {
          minHeight: 48,
          flexDirection: "row",
          "& > *:first-of-type": {
            marginBottom: 0,
            marginRight: theme.spacing(1),
          },
        },
        wrapper: {
          flexDirection: "row",
          whiteSpace: "nowrap",
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: "50%",
        },
      },
    },
  };
}
