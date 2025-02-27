import { Box, Grid, Stack, Typography, Container } from "@mui/material";
import React from "react";
import Triggers from "./target/Triggers";
import { themColor } from "@/src/theme/themColor";
interface PageThreeProps {
  title: string;
  onButtonClick: (page: string) => void;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
const PageThree: React.FC<PageThreeProps> = ({ ...props }) => {
  const { onButtonClick, title, state, setState } = props;
  console.log("state", state?.triggersAndTargeting.active);
  return (
    // <BoxContainer>
    <Container
    // sx={{
    //   paddingLeft: 0,
    //   paddingRight: 0,
    //   background: "#fff",
    //   border: `1px solid ${themColor.ghost}`,
    //   borderRadius: "8px",
    //   "::-webkit-scrollbar": {
    //     width: "none",
    //     height: "none",
    //   },
    //   "::-webkit-scrollbar-thumb": {
    //     background: "#a0a0a0",
    //   },
    //   "@media (min-width: 600px)": {
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //   },
    // }}
    >
      <Box
        sx={{
          // height: "85vh",
          borderRadius: "10px",
          margin: "0px",
          background: " #f7f8fc",
          // overflowY: "scroll",
          paddingLeft: 0,
          paddingRight: 0,
          border: `1px solid 4{themColor.ghost}`,
          "::-webkit-scrollbar": {
            width: "none",
            height: "none",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#a0a0a0",
          },
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        <Box
          sx={{
            opacity: 1,
            padding: "19px 30px",
            borderBottom: `1px solid ${themColor.ghost}`,
            backgroundColor: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flex: "0 1 auto",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              color={themColor.secondary}
              sx={{ fontSize: "1.5rem", fontWeight: "400" }}
            >
              <strong className="">Step 3:</strong>
              {title}
            </Typography>
          </Box>
        </Box>

        <Stack
          sx={{
            "& .css-1qlgd6n": {
              padding: "0px",
            },
          }}
          flexDirection={"row"}
          width={"100%"}
        >
          <Box
            // width={"64%"}
            width={"100%"}
            className="border-r-ghost"
            padding={"25px 30px 0"}
            sx={{ overflowy: "hidden", zIndex: "1" }}
          >
            <Triggers state={state} setState={setState} />
          </Box>
        </Stack>
      </Box>
    </Container>
    // </BoxContainer>
  );
};

export default PageThree;
