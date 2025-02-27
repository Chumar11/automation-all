import { Checkbox, Button, Typography, Box, IconButton } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import { SettingsInterface } from "@/src/types/settings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DeleteOutlineRounded } from "@mui/icons-material";

interface TrafficSource {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

export default function TrafficSource({ state, setState }: TrafficSource) {
  const [trueFalse, setTrueFalse] = useState(state?.triggersAndTargeting?.trafficTrueFalse);

 
useEffect(()=>{
  if(state?.triggersAndTargeting?.trafficTrueFalse){
    setTrueFalse(true)  }else{
      setTrueFalse(false) 
    }
},[state?.triggersAndTargeting?.trafficTrueFalse])


// const handleClick=()=>{
//   setState((prevState) => ({
//     ...prevState,
//     triggersAndTargeting: {
//       ...prevState?.triggersAndTargeting,
//       trafficTrueFalse:!prevState,
//     },
//   }));
  
// }


  const checkBox = state?.triggersAndTargeting?.trafficSource;
  type CheckBoxKeys =
    | "directVisit"
    | "socialNetwork"
    | "searchEngines"
    | "googleAds"
    | "specificURL";

  const handleCheckboxChange =
    (field: CheckBoxKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        triggersAndTargeting: {
          ...prevState.triggersAndTargeting,
          trafficSource: {
            ...prevState.triggersAndTargeting?.trafficSource,
            [field]: event.target.checked,
          },
        },
      }));
    };

  const options: { label: string; field: CheckBoxKeys }[] = [
    { label: "Direct visit", field: "directVisit" },
    { label: "Social networks", field: "socialNetwork" },
    { label: "Search engines", field: "searchEngines" },
    { label: "Google Ads", field: "googleAds" },
    { label: "Specific URL", field: "specificURL" },
  ];

  return (
    <Box
      sx={{
        ml: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          mt: "10px",
          color: themColor.blueGray,
        }}
      >
        Traffic Source
      </Typography>

      {trueFalse && (
        <Box
          sx={{
            p: "20px",
            pb: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            border: "1px solid #EAEFF2",
            background: themColor.snow,
            mt: "10px",
            mb: "15px",
            borderRadius: "5px",
            width: "100%",
            position: "relative",
            "&:hover": {
              borderColor: themColor.tertiary,
            },
          }}
        >
          {options.map(({ label, field }) => (
            <Box
              key={field}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() =>
                handleCheckboxChange(field)({
                  target: { checked: !checkBox?.[field] },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <Checkbox
                checked={checkBox?.[field]}
                onChange={handleCheckboxChange(field)}
                sx={{
                  px: 0,
                  color: themColor.primary,
                  "&.Mui-checked": { color: themColor.primary },
                  "&:hover": { background: "none" },
                }}
              />
              <Typography sx={{ color: themColor.secondary, fontSize: "14px" }}>
                {label}
              </Typography>
            </Box>
          ))}

          <IconButton
            onClick={() => {
              // setTrueFalse(false);
              setState((prevState) => ({
                ...prevState,
                triggersAndTargeting: {
                  ...prevState.triggersAndTargeting,
                  trafficTrueFalse:false,
                  trafficSource: {
                    directVisit: false,
                    socialNetwork: false,
                    searchEngines: false,
                    googleAds: false,
                    specificURL: false,
                  },
                },
              }));
            }}
            sx={{ position: "absolute", top: "0%", right: "0%" }}
          >
            <DeleteOutlineRounded />
          </IconButton>
        </Box>
      )}

      <Button
        size="small"
        sx={{
          border: "1px solid",
          borderColor: themColor.blueGray,
          fontSize: "12px",
          paddingX: "10px",
          height: "26px !important",
          color: themColor.blueGray,
          borderRadius: "7px",
          fontWeight: "500",
          marginBottom: "20px",
        }}
        onClick={() => {

          // setTrueFalse(!trueFalse)
          setState((prevState) => ({
            ...prevState,
            triggersAndTargeting: {
              ...prevState.triggersAndTargeting,
              trafficTrueFalse:!prevState?.triggersAndTargeting?.trafficTrueFalse,
              trafficSource: {
                directVisit: false,
                socialNetwork: false,
                searchEngines: false,
                googleAds: false,
                specificURL: false,
              },
            },
          }));
        }}

// {handleClick}

      >
        {!trueFalse ? "Add Rule" : "Remove Rule"}
      </Button>
    </Box>
  );
}
