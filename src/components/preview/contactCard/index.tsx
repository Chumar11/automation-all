import { Box, Typography, Stack, Paper, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Agent, SettingsInterface } from "@/src/types/settings";

interface ContactCardProps {
  SizeValue: string;
  MobileFontSizeValue: string;
  ImgPaddingValue: string;
  agents: Agent[];
  channels: any;
  setSelect: (select: boolean) => void;
  setActive: (active: boolean) => void;
  setChatViewOpen: (chatViewOpen: boolean) => void;
  setChartViewOpen: (chartViewOpen: boolean) => void;
  isMobileView: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  SizeValue,
  MobileFontSizeValue,
  ImgPaddingValue,
  agents,
  channels,
  setSelect,
  setActive,
  isMobileView,
  setChatViewOpen,
  setChartViewOpen,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: isMobileView ? "195px" : "240px",

        // maxWidth: "250px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#25D366",
          borderRadius: "10px 10px 0 0",
          color: "#fff",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: isMobileView ? "11px" : "13px",
            }}
            fontWeight="bold"
          >
            Contact Us on WhatsApp
          </Typography>
          <Typography
            sx={{ opacity: 0.9, fontSize: isMobileView ? "11px" : "12px" }}
          >
            How can we help?
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            setSelect(false);
            setActive(true);
            setChatViewOpen(true);
            setChartViewOpen(true);
          }}
          size="small"
          sx={{ color: "#fff", position: "absolute", top: 0, right: 0 }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          p: "8px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {agents.map((agent) => (
          <ContactItem
            SizeValue={SizeValue}
            key={agent.id}
            name={agent.userName}
            image={agent.profileImage || agent.iconUrl}
            profileImage={agent.profileImage}
            iconUrl={agent.iconUrl}
            channels={channels}
            ImgPaddingValue={ImgPaddingValue}
            MobileFontSizeValue={MobileFontSizeValue}
            salesSupport={agent.salesSupport}
          />
        ))}
      </Box>
    </Paper>
  );
};

// Define props type for ContactItem component
interface ContactItemProps {
  name: string;
  image: string;
  channels: any;
  iconUrl: string;
  profileImage?: string;
  ImgPaddingValue: string;
  MobileFontSizeValue: string;
  SizeValue: string;
  salesSupport: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  name,
  image,
  channels,
  profileImage,
  iconUrl,
  ImgPaddingValue,
  MobileFontSizeValue,
  SizeValue,
  salesSupport,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{
        p: 1,
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#f0f0f0", // Light grey background on hover
        },
      }}
    >
      <div
        style={{
          background: !profileImage && channels?.iconBackground,
          width: SizeValue,
          borderRadius: "50%",
          overflow: "hidden",
          padding: profileImage ? "0px" : ImgPaddingValue,
          height: SizeValue,
        }}
      >
        <img
          src={image}
          alt={name || "Agent"}
          style={{
            width: "100%",
            // height: profileImage && "52px",
            borderRadius: "50%",
            height: "100%",
          }}
        />
      </div>
      {/* <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          maxWidth: "400px",
          maxHeight: "30px", // Set a fixed height
          overflowY: "auto", // Enable vertical scrolling
          overflowX: "hidden", // Prevent horizontal overflow
          border: "1px solid #ccc", // Optional: Add a border for better visibility
          borderRadius: "8px",
        }}
      > */}
      <Box>
        <Typography
          sx={{
            fontWeight: 900,
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Prevent horizontal overflow
            fontSize: 14,
            textAlign: "start", // Ensure the text starts from the left
            padding: "0 8px",
            marginTop: "-4px",
            color: "#325e6d",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            overflowX: "hidden", // Prevent horizontal overflow
            fontSize: 12,
            textAlign: "start", // Ensure the text starts from the left
            padding: "0px 8px",
            color: "#325e6d",
          }}
        >
          {salesSupport}
        </Typography>
      </Box>
      {/* </Box> */}
    </Stack>
  );
};

export default ContactCard;
