// ----------------------------------------------------------------------

export default function Menu(theme) {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": { backdropFilter: "blur(0px)" },
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
  };
}
