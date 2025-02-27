// next
import useTranslation from "next-translate/useTranslation";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "src/redux/slices/settings";

// material
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { Button, FormControlLabel, Grid, Paper, Radio } from "@mui/material";

// styles
import RootStyled from "./styled";

// ----------------------------------------------------------------------

export default function SettingMode() {
  const { themeMode } = useSelector(
    ({ settings }: { settings: any }) => settings
  );
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  return (
    <RootStyled
      name="themeMode"
      value={themeMode}
      onChange={(event) => dispatch(setThemeMode(event.target.value))}
    >
      <Grid container spacing={1.5} dir="ltr">
        {["light", "dark"].map((mode, index) => (
          <Grid item xs={6} key={mode}>
            <Paper className="main-paper">
              <Button
                size="large"
                fullWidth
                variant="outlined"
                color={mode === "light" ? "warning" : "info"}
                disabled={themeMode === mode}
                className="button"
                startIcon={
                  index === 0 ? <WbSunnyRoundedIcon /> : <DarkModeRoundedIcon />
                }
              >
                {t("header." + mode)}
              </Button>
              <FormControlLabel
                label=""
                value={mode}
                control={<Radio sx={{ display: "none" }} />}
                sx={{
                  cursor: themeMode === mode ? "initial" : "pointer",
                }}
                className={`label ${themeMode === mode && "active"}`}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RootStyled>
  );
}
