import { AuthContext } from "@/src/contexts/AuthContext";
import { themColor } from "@/src/theme/themColor";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";

const CardHeader = ({
  uniqueDomains,
  domains,
}: {
  uniqueDomains: any[];
  domains: any[];
}) => {
  const { user }: any = useContext(AuthContext);
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
        gap: { xs: "16px", sm: "0" },
      }}
    >
      <Typography
        component={"h5"}
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.4rem" },
          fontWeight: 600,
          fontFamily: "Rubik, sans-serif",
          // color: "black",
        }}
      >
        {`WELCOME ${user.email
          .split("@")[0]
          .replace(/[0-9]/g, "")
          .toUpperCase()}`}
      </Typography>

      <Box
        sx={{
          padding: { xs: "0", sm: "0 20px" },
          borderLeft: { xs: "none", sm: "1px solid #eaeff2" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          sx={{
            color: themColor.tertiary,
            fontSize: ".75rem",
            marginBottom: "4px",
            fontWeight: 400,
          }}
        >
          # of domains
        </Typography>
        <Typography
          sx={{
            color: themColor.secondary,
            fontSize: ".875rem",
            fontWeight: 500,
          }}
        >
          {uniqueDomains.length}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: { xs: "0", sm: "0 20px" },
          borderLeft: { xs: "none", sm: "1px solid #eaeff2" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          sx={{
            color: themColor.tertiary,
            fontSize: ".75rem",
            marginBottom: "4px",
            fontWeight: 400,
          }}
        >
          Widgets created
        </Typography>
        <Typography
          sx={{
            color: themColor.secondary,
            fontSize: ".875rem",
            fontWeight: 500,
          }}
        >
          {domains.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardHeader;
