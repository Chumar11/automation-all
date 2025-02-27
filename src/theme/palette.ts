import { alpha } from "@mui/material/styles";
// ----------------------------------------------------------------------

export function createGradient(color1: string, color2: string) {
  return `linear-gradient(145.42deg, ${color1}, ${color2} 120%)`;
}

// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#f3f4f8",
  200: "#DFE3E8",
  300: "#C4CDD5",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const PRIMARY: any = {
  lighter: "#B3D8FE",
  light: "#66B1FD",
  main: "#007DFC",
  dark: "#0064CA",
  darker: "#004B97",
  contrastText: "#fff",
};
const SECONDARY: any = {
  lighter: "#B2B7BE",
  light: "#838B93",
  main: "#454F5B",
  dark: "#373F49",
  darker: "#292F37",
  contrastText: "#fff",
};
const INFO: any = {
  lighter: "#C4F0FD",
  light: "#88E0FB",
  main: "#39CCF9",
  dark: "#2EA5C9",
  darker: "#227E99",
  contrastText: "#fff",
};
const SUCCESS: any = {
  lighter: "#7FDDAE",
  light: "#55CD90",
  main: "#25D366",
  dark: "#008944",
  darker: "#006733",
  contrastText: GREY[800],
};
const WARNING: any = {
  lighter: "#FFDD99",
  light: "#FFCD66",
  main: "#FFAB00",
  dark: "#CC8900",
  darker: "#996700",
  contrastText: GREY[800],
};
const ERROR: any = {
  lighter: "#FF9999",
  light: "#FF6666",
  main: "#ED4337",
  dark: "#CC0000",
  darker: "#990000",
  contrastText: "#fff",
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.main, SECONDARY.main),
  info: createGradient(INFO.light, INFO.main),
  background: "radial-gradient( #DBEAFF, #F3DFE0,#DBCFF3,#DBEAFF)",
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,

  chart: CHART_COLORS,
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[400],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    divider: GREY[900],
    text: { primary: "#292D34", secondary: "#878D99", disabled: GREY[500] },
    background: { paper: "#FFFFFF", default: "#f7f8fc" },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    divider: GREY[400],
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: { paper: "#162031", default: "#0F172B" },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
