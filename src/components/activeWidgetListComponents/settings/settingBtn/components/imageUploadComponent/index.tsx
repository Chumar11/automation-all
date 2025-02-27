import NewToolTip from "@/src/components/newToolTip";
import { themColor } from "@/src/theme/themColor";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { NewSvg } from "src/components/svg";

interface ImageUploadComponentProps {
  selectedImage?: string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  title?: string;
  imgTitle?: string;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  selectedImage,
  handleImageUpload,
  handleRemoveImage,
  title,
  imgTitle,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      marginTop: "1.1rem",
    }}
  >
    <Typography
      variant="body2"
      sx={{
        display: "flex",
        color: themColor.tertiary,
        fontSize: "0.875rem",
      }}
    >
      {title}
      {title !== "QR Code" && (
        <NewToolTip
          tooltext="Please make sure you upload an image file of the following types: PNG/JPEG/JPG/GIF/SVG. The max file size is up to 100KB."
          placement="top"
          width="160px"
        >
          <IconButton sx={{ mt: -2 }}>
            <NewSvg />
          </IconButton>
        </NewToolTip>
      )}
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {selectedImage && (
        <Box
          sx={{
            maxWidth: "100px",
            height: "auto !important",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </Box>
      )}

      {!selectedImage ? (
        <Button component="label" sx={buttonStyles}>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          {imgTitle}
        </Button>
      ) : (
        <Button onClick={handleRemoveImage} sx={buttonStyles}>
          Remove Image
        </Button>
      )}
    </Box>
  </Box>
);

const buttonStyles = {
  color: themColor.secondary,
  border: `1px solid ${themColor.neutral}`,
  fontSize: "0.75rem",
  fontWeight: "400",
  paddingY: "3px",
  height: "auto !important",
  paddingX: "8px",
  borderRadius: "6px",
};

export default ImageUploadComponent;
