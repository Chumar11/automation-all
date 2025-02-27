// ----------------------------------------------------------------------

export default function Link(theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },

      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { color: "primary" },
          style: { color: theme.palette.primary.main },
        },
      ],
    },
  };
}
