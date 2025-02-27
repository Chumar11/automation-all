// ----------------------------------------------------------------------

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          border: `1px solid ${theme.palette.divider}`,
          transition: "all ease-in-out 0.3s",
          background: theme.palette.background.paper,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
