import React from "react";
// mui
import { CardContent, Typography, Stack, CardActionArea } from "@mui/material";
// styles
import RootStyled from "./styled";

// material

function FaqsCard({ ...props }) {
  const { item } = props;
  return (
    <RootStyled>
      <CardActionArea>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h4" color="text.primary">
              {item.question}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {item.answer}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </RootStyled>
  );
}

export default FaqsCard;
