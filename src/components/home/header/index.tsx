import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  TextField,
} from "@mui/material";
import {
  ChatBubble,
  Settings,
  Code,
  Logout,
  Send,
  ContentCopy,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { themColor } from "@/src/theme/themColor";
import CustomizedDialogs from "../../aboutpageComponents/NewModals";
import WeekPicker from "./CustomDayGraphy";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { useRouter } from "next/router";
import NewToolTip from "../../newToolTip";
import { NewSvg } from "../../svg";
import { AuthContext } from "@/src/contexts/AuthContext";
import toast from "react-hot-toast";
import EmptyWidgetList from "../../table/EmptyWidgetList";
interface Domain {
  id: string;
  domainName: string;
  type?: string; // Optional if not always present
  isActive?: boolean;
}
const Header = ({
  name,
  selectedPeriod,
  setSelectedPeriod,
  startDate, // Add this
  setStartDate, // Add this
  endDate, // Add this
  setEndDate,
  domains,
}: {
  name: string;
  selectedPeriod: any;
  setSelectedPeriod: any;
  startDate: Dayjs | null; // Updated type
  setStartDate: (date: Dayjs | null) => void; // Updated type
  endDate: Dayjs | null; // Updated type
  setEndDate: (date: Dayjs | null) => void; // Updated type
  domains: Domain[];
}) => {
  const router = useRouter();

  const { user }: any = useContext(AuthContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showInstallScript, setShowInstallScript] = useState(false);
  const [showEmailTextField, setShowEmailTextField] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const weekPickerRef = useRef<HTMLDivElement>(null);

  const installScriptRef = useRef<HTMLDivElement>(null);

  console.log("endAndStartDate:", startDate?.format("DD/MM/YYYY"), endDate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        weekPickerRef.current &&
        !weekPickerRef.current.contains(event.target as Node)
      ) {
        setShowWeekPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isMobileScreen = window.innerWidth <= 600;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        installScriptRef.current &&
        !installScriptRef.current.contains(event.target as Node)
      ) {
        setShowInstallScript(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileScreen]);

  const formattedCustomPeriod =
    startDate && endDate
      ? `${dayjs(startDate).format("MMM DD, YYYY")} to ${dayjs(endDate).format(
          "MMM DD, YYYY"
        )}`
      : startDate || endDate
      ? `${dayjs(startDate || endDate).format("MMM DD, YYYY")}`
      : "Custom";

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `<script src="https://all-social-icons-app.s3.ap-southeast-2.amazonaws.com/bundle.js?id=${user._id}"></script>`
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
  };

  const handlemail = async () => {
    setShowEmailTextField(true);
    const emailData = {
      to: emailValue,
      text: `<script src="https://all-social-icons-app.s3.ap-southeast-2.amazonaws.com/bundle.js?id=${user._id}"></script>`,
    };

    if (showEmailTextField) {
      try {
        const response = await fetch("/api/mail/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Email sent successfully!");
          setEmailValue("");
          setShowEmailTextField(false);
          toast.success("Email sent successfully!");
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  return (
    <>
      <CustomizedDialogs open={open} setOpen={setOpen} />

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Buttons Row */}
        <Grid
          container
          spacing={isSmallScreen ? 2 : 1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid
            item
            sx={{
              position: "relative",
            }}
          >
            <Button
              sx={{
                backgroundColor: showInstallScript
                  ? "rgba(0, 125, 252, 0.08) !important"
                  : "transparent",
                color: themColor.primary,
                border: `1px solid ${themColor.primary}`,
                fontSize: ".88rem",
                fontWeight: 400,
                height: "40px",
                padding: "1rem 0.87rem",
              }}
              variant="outlined"
              size="small"
              startIcon={<Code />}
              onClick={() => setShowInstallScript(!showInstallScript)}
            >
              Installation Code
            </Button>
            {showInstallScript && (
              <Box
                ref={installScriptRef}
                sx={{
                  padding: "1.4rem",
                  minWidth: "30.5rem",
                  right: 0,
                  left: "unset",

                  position: "absolute",
                  background: "#fff",
                  border: "1px solid #eaeff2",
                  boxShadow: "0 11.5px 19.5px -4.875px rgba(0, 0, 0, .2)",
                  borderRadius: "8px",
                  zIndex: 99,
                  top: "110%",
                  width: "100%",
                }}
              >
                <Typography
                  component="h5"
                  sx={{
                    fontSize: "1.4rem",
                    color: themColor.secondary,
                    fontWeight: 600,
                    marginBottom: "1.5rem",
                  }}
                >
                  Installation Code
                </Typography>

                <Typography
                  sx={{
                    color: themColor.tertiary,
                    fontSize: ".875rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component={"p"}
                    sx={{
                      fontSize: ".875rem",
                    }}
                  >
                    {
                      "Copy the code and paste it in every page above the </head>"
                    }
                  </Typography>
                  <NewToolTip
                    tooltext={
                      "If you can't add the code before the closing </head> tag, you can paste the code before the closing </body> tag"
                    }
                    width="270px"
                    placement="top"
                  >
                    <IconButton
                      sx={{
                        // mt: 1.2,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <NewSvg />
                    </IconButton>
                  </NewToolTip>
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    color: themColor.tertiary,
                    background: "#eaeff2",
                    border: "1px solid #eaeff2",
                    borderRadius: "8px",
                    padding: "1rem",
                    wordWrap: "break-word",
                  }}
                >
                  {`<script src="https://all-social-icons-app.s3.ap-southeast-2.amazonaws.com/bundle.js?id=${user._id}"></script>`}
                </Typography>

                {showEmailTextField && (
                  <Box
                    sx={{
                      marginTop: "20px !important",
                      color: themColor.secondary,
                      fontWeight: 400,
                    }}
                  >
                    <Typography
                      component="p"
                      sx={{
                        color: themColor.tertiary,
                        fontSize: ".875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      To
                    </Typography>

                    <TextField
                      sx={{
                        padding: "0",
                        color: themColor.tertiary,
                        fontSize: ".75rem", // Adjusted font size for the input text
                        lineHeight: 1.6,
                        appearance: "textfield",
                        transition: "border .3s ease-in, color .3s ease-in",
                        width: "100%",
                        backgroundColor: "transparent",
                        borderRadius: "8px",
                        outline: "none",
                        border: `1px solid ${themColor.LightBlueGray}`,
                        fontFamily: "Rubik, sans-serif",
                        "& input": {
                          fontSize: ".875rem", // Input text size
                        },
                        "& .MuiInputBase-input": {
                          fontSize: ".875rem", // Ensures font size is applied to the input itself
                        },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: ".875rem", // Smaller placeholder text size
                        },
                      }}
                      placeholder="Enter email address"
                      type="email"
                      value={emailValue}
                      onChange={handleChange}
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    marginTop: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    // gap:'10px'
                  }}
                >
                  <Button
                    sx={{
                      border: `1px solid ${themColor.tertiary}`,
                      color: themColor.secondary,
                      fontWeight: 400,
                      height: "35px",
                      fontSize: ".875rem",
                      paddingLeft: "1em",
                      background: "transparent",
                      paddingRight: "1em",
                      gap: "5px",
                    }}
                    onClick={handlemail}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      svg-inline=""
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        d="M14.667 1.333L7.333 8.667M14.667 1.333L10 14.667l-2.667-6-6-2.667 13.334-4.667z"
                        stroke="currentColor"
                        stroke-width="1.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    {showEmailTextField ? "Send Now" : "Send Via email..."}
                  </Button>

                  <Button
                    sx={{
                      border: `1px solid ${themColor.primary}`,
                      color: themColor.white,
                      fontWeight: 400,
                      height: "35px",
                      fontSize: ".875rem",
                      paddingLeft: "1em",
                      background: `${themColor.primary}`,
                      paddingRight: "1em",
                      gap: "5px",
                      marginLeft: ".8rem",
                      "&:hover": {
                        backgroundColor: "#005BB2",
                      },
                    }}
                    onClick={handleCopy}
                  >
                    Copy
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      svg-inline=""
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        d="M13.333 6h-6C6.597 6 6 6.597 6 7.333v6c0 .737.597 1.334 1.333 1.334h6c.737 0 1.334-.597 1.334-1.334v-6c0-.736-.597-1.333-1.334-1.333z"
                        stroke="currentColor"
                        stroke-width="1.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M3.333 10h-.666a1.333 1.333 0 01-1.334-1.333v-6a1.333 1.333 0 011.334-1.334h6A1.333 1.333 0 0110 2.667v.666"
                        stroke="currentColor"
                        stroke-width="1.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>

          <Grid item>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: themColor.secondary,
                border: `1px solid ${themColor.tertiary}`,
                fontSize: ".88rem",
                fontWeight: 400,
                padding: "1rem 0.99rem",
                "&:hover": {
                  backgroundColor: themColor.white,
                  borderColor: "#83a1b8",
                },
              }}
              variant="outlined"
              size="small"
              startIcon={<Logout />}
              onClick={() => {
                localStorage.clear();
                router.reload();
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            pointerEvents: domains.length === 0 ? "none" : "auto",
            filter: domains.length === 0 ? "blur(2px)" : 'blur("0px")',
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            fontWeight="bold"
            textAlign={isSmallScreen ? "center" : "left"}
          >
            {name}
          </Typography>

          {/* Filter and Button Row */}
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              flexDirection: isSmallScreen ? "column" : "row",
              gap: isSmallScreen ? "16px" : "0",
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ position: "relative", justifyContent: "center" }}>
                <Box ref={weekPickerRef}>
                  {showWeekPicker && (
                    <div
                      style={{
                        width: "100%",
                        position: "absolute",
                        top: 45,
                        left: isMobileScreen ? "-100px" : "0px",
                        zIndex: 10,
                        background: "#fff",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        minWidth: "300px",
                        maxWidth: "500px",
                      }}
                    >
                      <WeekPicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                      />
                      {/* Your WeekPicker Component goes here */}
                    </div>
                  )}
                </Box>

                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%" }}
                >
                  <Select
                    value={selectedPeriod}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "Custom") {
                        setSelectedPeriod("Custom");
                        setShowWeekPicker(true);
                      } else {
                        setSelectedPeriod(value);
                        setShowWeekPicker(false);
                      }
                    }}
                    renderValue={(selected) => {
                      const labelMap: Record<string, string> = {
                        today: "Today",
                        yesterday: "Yesterday",
                        thisweek: "This week",
                        last7days: "Last 7 days",
                        thismonth: "This month",
                        last30days: "Last 30 days",
                        lastmonth: "Last month",
                        AllTime: "All Time",
                        Custom:
                          formattedCustomPeriod !== "Custom"
                            ? formattedCustomPeriod
                            : "Custom",
                      };
                      return labelMap[selected] || "Select a period";
                    }}
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="thisweek">This week</MenuItem>
                    <MenuItem value="last7days">Last 7 days</MenuItem>
                    <MenuItem value="thismonth">This month</MenuItem>
                    <MenuItem value="last30days">Last 30 days</MenuItem>
                    <MenuItem value="lastmonth">Last month</MenuItem>
                    <MenuItem value="AllTime">All Time</MenuItem>
                    <MenuItem
                      value="Custom"
                      onClick={() => setShowWeekPicker(true)}
                    >
                      Custom
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item>
              <Button
                onClick={() => {
                  handleClickOpen();
                }}
                sx={{
                  background: themColor.primary,
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  padding: "10px 20px",
                  width: isSmallScreen ? "100%" : "auto",
                }}
                variant="contained"
                color="primary"
                startIcon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    svg-inline=""
                    role="presentation"
                    focusable="false"
                  >
                    <path
                      d="M15.833 2.5H4.167c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.746 1.667 1.667 1.667h11.666c.92 0 1.667-.746 1.667-1.667V4.167c0-.92-.746-1.667-1.667-1.667zM10 6.667v6.666M6.667 10h6.666"
                      stroke="currentColor"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                }
              >
                New Widget
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Header;
