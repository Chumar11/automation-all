// ----------------------------------------------------------------------

export default function Popover(theme) {
  return {
    MuiPopover: {
      defaultProps: {
        dir: theme.direction,
      },
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            opacity: "0!important",
          },
        },
      },
    },
  };
}
