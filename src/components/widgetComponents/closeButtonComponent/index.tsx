import { Box, TextField, Typography } from "@mui/material";
import { textFieldStyles } from "../../settingBtn/components/textFieldStyles";
// import { themColor } from "@/src/theme/themColor";
import { CloseBtn } from "../../svg";
// import { themColor } from "@/src/theme/themeColor";
import { SettingsInterface } from "@/src/types/settings";
import { Dispatch, SetStateAction } from "react";
import { themColor } from "@/src/theme/themColor";

interface CloseButtonComponentProps {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const CloseButtonComponent: React.FC<CloseButtonComponentProps> = ({
  state,
  setState,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      preview: {
        ...state.preview,
        onCloseButton: e.target.value,
      },
    });
  };

  const handleOnClose = () => {
    console.log("Close Button Clicked");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "10px",
        backgroundColor: "#f9fafb",
        padding: "20px 15px",
        border: `1px solid ${themColor.ghost}`,
        position: "relative",
        marginBottom: "20px",
        cursor: "pointer",
        width: "100%",
        "&:hover": {
          borderColor: themColor.tertiary,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          width: "45px",
          height: "40px",
          // backgroundColor: "#a884cd", // Background color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <CloseBtn handleOnClose={handleOnClose} state={state} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <TextField
          placeholder={"Close"}
          sx={{
            ...textFieldStyles,
            "& .MuiOutlinedInput-root": {
              ...textFieldStyles["& .MuiOutlinedInput-root"],
              width: "280px",
            },
          }}
          value={state?.preview?.onCloseButton}
          onChange={handleTextChange}
        />

        <Typography
          sx={{
            marginTop: "5px",
            color: themColor.tertiary,
            fontSize: ".8rem",
          }}
        >
          On Hover Close Button Text
        </Typography>
      </Box>
    </Box>
  );
};

export default CloseButtonComponent;
