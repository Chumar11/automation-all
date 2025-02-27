import { themColor } from "@/src/theme/themColor";
import { Box, Checkbox, Typography } from "@mui/material";

interface CheckboxComponentProps {
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  checked,
  handleCheckboxChange,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      flexDirection: {
        xs: "column",
        sm: "column",
      },
    }}
  >
    <Typography
      sx={{
        color: themColor.tertiary,
        fontSize: {
          xs: ".75rem",
          sm: ".875rem",
        },
      }}
    >
      Whatsapp Web
    </Typography>
    <Typography
      sx={{
        fontSize: {
          xs: ".75rem",
          sm: ".875rem",
        },
        marginBottom: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange} // Ensure this is used correctly
        sx={{
          paddingX: "0px",
          color: themColor.primary,
          "&.Mui-checked": {
            color: themColor.primary,
          },
          "&:hover": {
            background: "none",
          },
        }}
      />
      Use Whatsapp Web directly on desktop
    </Typography>
  </Box>
);

export default CheckboxComponent;
