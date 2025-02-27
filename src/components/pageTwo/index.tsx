import { themColor } from "@/src/theme/themColor";
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { StepperTwo } from "src/components/pageTwo/steppertwo";
interface PageTwo {
  title: string;
  onButtonClick: (page: string) => void;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const PageTwo: React.FC<PageTwo> = ({ ...props }) => {
  const { onButtonClick, title, state, setState } = props;

  return (
    <Container
      sx={{
        paddingLeft: 0,
        borderRadius: "10px",
        background: "#fff",
        width: {
          xs: "112.7%",
        },
        border: `1px solid ${themColor.ghost}`,
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
      <Box>
        <Box
          sx={{
            opacity: 1,
            padding: "15px 30px",
            borderBottom: `1px solid ${themColor.ghost}`,
            backgroundColor: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 20,
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
              <strong className="">Step 2:</strong>
              {title}
            </Typography>
          </Box>
        </Box>
        <Stack flexDirection={"row"} width={"100%"}>
          <Box
            // width={"64%"}
            width={"100%"}
            className="border-r-ghost border-r-[1px] "
            padding={"25px 30px 0"}
            sx={{ overflowy: "hidden", zIndex: "1" }}
          >
            <StepperTwo state={state} setState={setState} />
          </Box>
        </Stack>
      </Box>
    </Container>
    // </BoxContainer>
  );
};

export default PageTwo;
