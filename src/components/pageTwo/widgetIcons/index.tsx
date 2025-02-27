import { Avatar, Box, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Typo } from "../Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton } from "@mui/material";
import NewToolTip from "../../newToolTip";
import { NewSvg } from "../../svg";
import { themColor } from "@/src/theme/themColor";
interface Widgetprops {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
const WidgetIcons: React.FC<Widgetprops> = ({ ...props }) => {
  const { state, setState } = props;
  const array = [
    "/svg/icon1.svg",
    "/svg/icon2.svg",
    "/svg/icon3.svg",
    "/svg/icon4.svg",
  ];
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...state,
          widgetcustomization: {
            ...state.widgetcustomization,
            CustomwidgetIcon: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file); // Converts file to Base64 string
    }
  };
  const icon = state?.widgetcustomization?.CustomwidgetIcon;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [borderColor, setBorderColor] = useState("rgba(183, 141, 235, 0)");
  const [selectedValue, setSelectedValue] = useState<string>("");
  useEffect(() => {
    const storedValue = localStorage.getItem("selectedValue");
    if (storedValue) {
      setSelectedValue(storedValue);
    } else {
      setSelectedValue(state.widgetcustomization.widgetIcon.toString());
    }
  }, []);
  const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    const val = Number(event.target.value);
    if (val === 4) {
      fileInputRef.current?.click();
    }
    localStorage.setItem("selectedValue", event.target.value);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        widgetIcon: val,
        CustomwidgetIcon: "",
      },
    });
    event.target.value = "";
  };
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typo tittle={"Widget Icons"} />
        <NewToolTip
          tooltext={
            "Change the size of your Ichonic widget. S is the smallest and XXL is the largest. You can also set custom sizes (the actual size of the Ichonic widget is not reflected on the preview. View the size changes on the actual website)"
          }
          width="160px"
          placement="top"
        >
          <IconButton
            sx={{
              mt: 1.2,
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
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          alignItems: "center",
        }}
      >
        <RadioGroup row onChange={handleChanged} value={selectedValue}>
          {array.map((icon, index) => (
            <Box key={index}>
              <Box
                sx={{
                  border: `4px solid ${
                    selectedValue === index.toString()
                      ? themColor.hoverBorder
                      : borderColor
                  }`,
                  borderRadius: "50%",
                  width: "53px",
                  height: "53px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border 0.9s ease",
                }}
              >
                <Avatar
                  src={icon}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedValue(index.toString());
                    setState({
                      ...state,
                      widgetcustomization: {
                        ...state.widgetcustomization,
                        widgetIcon: index,
                        CustomwidgetIcon: "",
                      },
                    });
                    localStorage.setItem("selectedValue", index.toString());
                  }}
                />
              </Box>

              <Radio
                value={index.toString()}
                checked={selectedValue == index.toString()}
                sx={{
                  "&.Mui-checked": {
                    color: themColor.primary,
                  },
                  "&:hover": {
                    background: "none",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.1rem", // Custom icon size
                  },
                  marginLeft: "7px",
                }}
              />
            </Box>
          ))}
          <Box>
            <Box
              sx={{
                border: `4px solid ${
                  selectedValue === "4" ? themColor.hoverBorder : borderColor
                }`,
                borderRadius: "50%",
                width: "53px",
                height: "53px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border 0.9s ease",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <label htmlFor="upload-widget-icon">
                <Avatar
                  sx={{ width: "25px", height: "25px", cursor: "pointer" }}
                  src="/svg/icon5.svg"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setSelectedValue("4");
                    localStorage.setItem("selectedValue", "4");
                  }}
                />
              </label>
            </Box>
            <Radio
              value="4"
              checked={selectedValue === "4"}
              sx={{
                "&.Mui-checked": {
                  color: themColor.primary,
                },
                "&:hover": {
                  background: "none",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.1rem",
                },
                marginLeft: "9px",
              }}
            />
          </Box>
        </RadioGroup>
      </Box>
    </Box>
  );
};
export default WidgetIcons;
