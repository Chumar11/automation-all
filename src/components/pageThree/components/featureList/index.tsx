import React, { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";
import { SettingsInterface } from "@/src/types/settings";
import TrafficSource from "./components/trafficSource";
import CountryTargeting from "./components/countryTargeting";

interface FeatureListProps {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

export default function FeatureList({ state, setState }: FeatureListProps) {
  return (
    <Box>
      <TrafficSource state={state} setState={setState} />
      <CountryTargeting state={state} setState={setState} />
    </Box>
  );
}
