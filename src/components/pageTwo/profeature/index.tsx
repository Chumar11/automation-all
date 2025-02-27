// import { themColor } from "@/src/theme/themColor";
import { themColor } from "@/src/theme/themColor";
import { SettingsInterface } from "@/src/types/settings";
import { IOSSwitch } from "@/src/utils/IosSwitch";
import { Box, Typography } from "@mui/material";
interface ProFeatureProps {
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
export default function ProFeature({ state, setState }: ProFeatureProps) {
  const handleNew = state.widgetcustomization?.customCss;
  const handlegoogle=state.widgetcustomization?.googleAnalytics;
  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "1.25rem",
          color: themColor.secondary,
          fontFamily: "Rubik, sans-serif",
          lineHeight: "1.4",
          marginX: "5px",
          marginTop: "30px",
          position: "relative",
          "&::before": {
            borderRadius: "4px",
            content: '""',
            width: "4px",
            height: "60%",
            color: themColor.primary,
            backgroundColor: themColor.primary,
            position: "absolute",
            left: "-12px",
            top: "20%",
          },
          marginBottom: "20px",
        }}
      >
        Features 🚀
      </Typography>
      <Typography
        sx={{
          fontSize: ".875rem",
          lineHeight: "32px",
          color: themColor.tertiary,
          marginBottom: "8px",
        }}
      >
        Custom CSS
      </Typography>
      <IOSSwitch
        conditionType="customCss"
        sx={{ m: 1 }}
        state={state}
        setState={setState}
        handleNew={handleNew}
        // handleNew={handleNew}
      />
      <Typography
        sx={{
          fontSize: ".875rem",
          lineHeight: "32px",
          color: themColor.tertiary,
          marginBottom: "8px",
        }}
      >
        Google Analytics
      </Typography>
      <IOSSwitch  conditionType="googleanalytical"   handleNew={handlegoogle} sx={{ m: 1 }} state={state} setState={setState} />
    </Box>
  );
}
