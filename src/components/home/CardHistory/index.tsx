import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import NewToolTip from "@/src/components/newToolTip";
import { NewSvg } from "@/src/components/svg";
import { themColor } from "@/src/theme/themColor";

const CardHistory = ({ dashboardVisit }: { dashboardVisit: any }) => {
  return (
    <>
      {/* Second Box for Cards */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {dashboardVisit.map((card: any) => (
          <Box
            key={card.id}
            sx={{
              width: "100%",
              background: "#fff",
              border: "1px solid #eaeff2",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "end",
              }}
            >
              <NewToolTip
                tooltext={card?.tooltip}
                width="200px"
                placement="top"
              >
                <IconButton
                  sx={{
                    color:themColor.neutral,
                    fontSize: "40px",
                    transition: "color .3s linear",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <NewSvg />
                </IconButton>
              </NewToolTip>
            </Box>

            <Box
              sx={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  src={card.avatarImg}
                  alt={card.name}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: "16px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {card.name}
                </Typography>
                <Typography
                  sx={{
                    color: themColor.tertiary,
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    marginTop: "4px",
                  }}
                >
                  {card.history}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Second Box for Cards */}
    </>
  );
};

export default CardHistory;
