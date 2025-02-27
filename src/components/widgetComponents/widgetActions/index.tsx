// import { themColor } from "@/src/theme/themColor";
import { themColor } from "@/src/theme/themColor";
import { Add, Chat } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

interface WidgetActionsProps {
  handleNew: () => void;
}

const WidgetActions: React.FC<WidgetActionsProps> = ({ handleNew }) => (
  <Box
    display="flex"
    alignItems="center"
    gap="10px"
    marginBottom="20px"
    sx={{
      flexDirection: "row",
    }}
  >
    <Button
      startIcon={<Add />}
      sx={{
        "&:hover": {
          backgroundColor: "#edf3f6",
        },
        "& .MuiSvgIcon-root": {
          color: themColor.secondary,
        },
        "&.MuiButton-sizeMedium": {
          border: `1px solid ${themColor.neutral}`,
          borderRadius: "4px",
          color: themColor.secondary,
          fontSize: "0.75rem",
          fontWeight: 400,
          height: "32px",
          padding: "0 8px",
        },
      }}
      onClick={handleNew}
    >
      Custom Channel
    </Button>
    <Button
      startIcon={<Chat />}
      sx={{
        "&:hover": {
          backgroundColor: "#edf3f6",
        },
        "& .MuiSvgIcon-root": {
          color: "#0446de",
        },
        "&.MuiButton-sizeMedium": {
          borderRadius: "4px",
          border: "1px solid #0446de",
          fontSize: "0.75rem",
          height: "32px",
          padding: "0 8px",
          paddingLeft: "10px",
        },
      }}
    >
      Manage Live Chat
    </Button>
  </Box>
);

export default WidgetActions;
