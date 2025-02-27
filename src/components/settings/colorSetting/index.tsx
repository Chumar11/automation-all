import {
  Box,
  CardActionArea,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// theme
import palette from "src/theme/palette";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { setThemeColor } from "src/redux/slices/settings";

// styles
import RootStyled from "./styled";

// ----------------------------------------------------------------------
const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635DC",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // RED
  {
    name: "red",
    lighter: "#C8FACD",
    light: "#fa6e6e",
    main: "#FF3030",
    dark: "#bf1f1f",
    darker: "#a80303",
    contrastText: "#fff",
  },
  // BLUE
  {
    name: "blue",
    lighter: "#CCDFFF",
    light: "#6697FF",
    main: "#0D44FB",
    dark: "#0027B7",
    darker: "#00137A",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#FDA92E",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // GREEN
  {
    name: "green",
    lighter: "#E9FCD4",
    light: "#3BC776",
    main: "#18AB56",
    dark: "#159B4E",
    darker: "#058039",
    contrastText: "#fff",
  },
];

export function setColor(themeColor: string | null) {
  let color;
  const DEFAULT = PRIMARY_COLOR[0];
  const PURPLE = PRIMARY_COLOR[1];
  const RED = PRIMARY_COLOR[2];
  const BLUE = PRIMARY_COLOR[3];
  const ORANGE = PRIMARY_COLOR[4];
  const GREEN = PRIMARY_COLOR[5];

  switch (themeColor) {
    case "purple":
      color = PURPLE;
      break;
    case "red":
      color = RED;
      break;
    case "blue":
      color = BLUE;
      break;
    case "orange":
      color = ORANGE;
      break;
    case "green":
      color = GREEN;
      break;
    default:
      color = DEFAULT;
  }
  return color;
}

export default function ColorSetting() {
  const dispatch = useDispatch();
  const { themeColor } = useSelector(
    ({ settings }: { settings: any }) => settings
  );

  return (
    <RootStyled
      name="themeColor"
      value={themeColor}
      onChange={(e) => dispatch(setThemeColor(e.target.value))}
    >
      <Grid container spacing={1.5} dir="ltr">
        {PRIMARY_COLOR.map((color) => {
          const colorName: string = color.name;
          const colorValue: string = color.main;
          const isSelected: boolean = themeColor === colorName;

          return (
            <Grid item xs={4} key={colorName}>
              <Paper
                variant={isSelected ? "elevation" : "outlined"}
                className={`color-paper`}
                sx={{
                  ...(isSelected && {
                    bgcolor: alpha(colorValue, 0.12),
                    border: `solid 2px ${colorValue}!important`,
                    borderRadius: "50%",
                    boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`,
                  }),
                }}
              >
                <CardActionArea sx={{ borderRadius: "50%", color: colorValue }}>
                  <Box className="action-box">
                    <Box
                      className="color-box"
                      sx={{
                        bgcolor: colorValue,
                        ...(isSelected && { transform: "none" }),
                      }}
                    />
                  </Box>

                  <FormControlLabel
                    label=""
                    value={colorName}
                    control={<Radio sx={{ display: "none" }} />}
                    className="label"
                  />
                </CardActionArea>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </RootStyled>
  );
}
