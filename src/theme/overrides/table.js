import { createGradient } from "src/theme/palette";
// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-head": {
            background: theme.palette.primary.main,
            th: {
              color: theme.palette.common.white,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "none",
          },

          head: {
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            "&:first-of-type": {
              paddingLeft: theme.spacing(3),
              // borderTopLeftRadius: theme.shape.borderRadius,
              // borderBottomLeftRadius: theme.shape.borderRadius,
              // boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`
            },
            "&:last-of-type": {
              paddingRight: theme.spacing(3),
              // borderTopRightRadius: theme.shape.borderRadius,
              // borderBottomRightRadius: theme.shape.borderRadius,
              // boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`,
            },
          },
          stickyHeader: {
            background: createGradient(
              theme.palette.primary.main,
              theme.palette.primary.darker
            ),
          },
          body: {
            borderBottom: "1px solid " + theme.palette.divider,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            "&:first-of-type": {
              paddingLeft: theme.spacing(3),
            },
            "&:last-of-type": {
              paddingRight: theme.spacing(3),
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            borderTop: `solid 1px ${theme.palette.divider}`,
          },
          toolbar: {
            height: 64,
          },
          select: {
            "&:focus": {
              borderRadius: theme.shape.borderRadius,
            },
          },
          selectIcon: {
            width: 20,
            height: 20,
            marginTop: 2,
          },
        },
      },
    },
  };
}
