import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useEffect, useState } from "react";
import IOSSwitch from "../settingBtn/components/IOSSwitch";
import {
  Box,
  Button,
  Card,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Array from "../Array/array";
import Link from "next/link";
import { log } from "console";
import { AuthContext } from "@/src/contexts/AuthContext";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { DeleteOutlineRounded } from "@mui/icons-material";
import RenameWidgetDialog from "./UpdateRename";
import DomainWidgetDialog from "./UpdateDomain";
import {
  getUniqueDomains,
  SettingsContext,
} from "@/src/contexts/SettingsContext";
import TableImages from "./TableImages";
import MobileVisitor from "./MobileVisitor";
import MobileClicks from "./MobileClicks";
import ClicksRate from "./ClicksRate";
import { themColor } from "@/src/theme/themColor";
import EmptyWidgetList from "./EmptyWidgetList";
import CreateWidget from "./CreateWidget";
// import { getUniqueDomains } from "@/src/contexts/SettingsContext";

const TableComponet = () => {
  const { domains, setDomains, selectedPeriod, endDate, startDate } =
    useContext(SettingsContext);
  const [data, SetData] = useState("");
  const [edit, setEdit] = useState<boolean>(false); // Changed to boolean
  const [rename, setRename] = useState<boolean>(false); // Changed to boolean
  const [changeDomain, setChangeDomain] = useState<boolean>(false); // Changed to boolean
  const { user }: any = useContext(AuthContext);
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [deleteWidget, setDeleteWidget] = useState<boolean>(false);
  const [emptyWidget, setEmptyWidget] = useState<boolean>(false);
  const [state, setState] = useState<any>([]);
  const [clickMobile, setClickMobile] = useState<any>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  const date1 = startDate?.format("YYYY-MM-DD");
  const date2 = endDate?.format("YYYY-MM-DD");
  // ... rest of your code
  // const userId = user?._id;
  useEffect(() => {
    const fetchVisitorData = async () => {
      // console.log("user", user);

      try {
        const response = await fetch(`/api/visitors/${user._id}`);

        const data = await response.json();
        console.log("data", data);
        setState(data);
        if (!response.ok) {
          throw new Error("Failed to fetch visitor data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisitorData();
  }, [selectedPeriod]);

  useEffect(() => {
    const fetchVisitorData = async () => {
      // console.log("user", user);

      try {
        const response = await fetch(`/api/clicks/${user._id}`);

        const data = await response.json();
        console.log("data", data);
        setClickMobile(data);
        if (!response.ok) {
          throw new Error("Failed to fetch visitor data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisitorData();
  }, [selectedPeriod]);

  useEffect(() => {
    if (state.length > 0) setState(state);
  }, [state]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`/api/domain?userId=${user._id}`); // Replace 'yourUserId' with the actual user ID
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDomains(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [user, deleteWidget]);

  // const deleteDomains = async (domain: any) => {
  //   try {
  //     const response = await fetch(`/api/domain?domainId=${domain._id}`, {
  //       method: "DELETE",
  //     }); // Replace 'yourUserId' with the actual user ID

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     setDeleteWidget(true);
  //     console.log("dataDelete:", domains);
  //     setDomains(data);
  //     console.log("domainDelete", domains);
  //   } catch (error) {
  //     console.error("Error fetching domains:", error);
  //   }
  // };

  const deleteDomains = async (domain: any) => {
    try {
      const response = await fetch(`/api/domain?domainId=${domain._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.deleted) {
        setDeleteWidget(true); // For UI indication of successful deletion
        setDomains(data.domains); // Update the domain list with the remaining domains
        console.log("Updated domains:", data.updatedDomains);
      } else {
        console.log("Error: Domain not deleted");
      }
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const uniqueDomains = getUniqueDomains(domains);
  console.log(uniqueDomains.length, "uniqueDomains");

  useEffect(() => {
    if (domains.length >= 1) {
      setEmptyWidget(false);
    } else {
      setEmptyWidget(true);
    }
  }, [emptyWidget, deleteWidget, domains]);

  const handleSwitchChange = async (domainId: any) => {
    const API_URL = `/api/domain?domainId=${domainId.id}`;

    // Find the domain to toggle
    const domainToUpdate = domains.find((domain) => domain.id === domainId.id);
    if (!domainToUpdate) return;
    console.log("Toggling domain state for:", domainToUpdate);

    // Optimistic update: Change the local state immediately
    setDomains((prevDomains) =>
      prevDomains.map((domain) =>
        domain.id === domainId.id
          ? { ...domain, isActive: !domain.isActive } // Toggle the isActive state
          : domain
      )
    );
    console.log("Local state updated optimistically.");

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !domainToUpdate.isActive,
        }),
      });
      console.log("API request sent to update domain status.");

      // Check if the response was successful
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(
          ` Failed to update domain status. Status: ${response.status} - ${errorDetails}`
        );
      }

      const data = await response.json();
      console.log("Domain updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error updating domain status:", error);

      // Optionally revert the local state if the API call fails
      setDomains((prevDomains) =>
        prevDomains.map((domain) =>
          domain.id === domainId.id
            ? { ...domain, isActive: !domain.isActive } // Revert the isActive state
            : domain
        )
      );
    }
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        // maxWidth: "1280px",
        padding: "20px 0",
        width: "100%",
      }}
    >
      {(rename || changeDomain) && rename ? (
        <RenameWidgetDialog
          data={data}
          open={rename}
          domains={domains}
          setOpen={setRename}
          setDomains={setDomains}
          // activeEditId={activeEditId}
        />
      ) : (
        <DomainWidgetDialog
          domains={domains}
          data={data}
          open={changeDomain}
          setOpen={setChangeDomain}
          setDomains={setDomains}
        />
      )}

      {domains.length === 0 ? (
        <>
          <Box position="relative">
            <CreateWidget />
            <EmptyWidgetList />
          </Box>
        </>
      ) : (
        uniqueDomains.map((domain: any) => {
          return (
            <>
              {domains.some(
                (dm: any) => dm.domainName === domain.domainName
              ) && (
                <>
                  {/* <div></div> */}
                  <Typography
                    component="a"
                    href={domain.domainName}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Ensures security for external links
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#9b9b9b",
                      marginBottom: "1rem",
                      // marginTop: "5rem",
                    }}
                  >
                    {domain.domainName}
                  </Typography>

                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <TableContainer
                      sx={{
                        border: "none",
                        borderRadius: "10px",
                        width: "100%",
                        // overflow: "unset",
                        overflowX: "auto",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 24px 1px rgba(0,0,0,0.1)",
                        marginBottom: "3rem",
                      }}
                    >
                      <Table>
                        {/* table Heads */}
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Visitors</TableCell>
                            <TableCell>Unique Clicks</TableCell>
                            <TableCell>Click Rate</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>

                        {/* BOdy 1 */}

                        {domains
                          .filter(
                            (dom: any) => dom.domainName === domain.domainName
                          )
                          .map((domain, index) => {
                            return (
                              <>
                                <TableBody
                                  key={index}
                                  sx={{
                                    borderTop: "2px solid #eaeff2",
                                  }}
                                >
                                  <TableRow
                                    sx={{
                                      borderTopColor: "transparent",
                                      borderBottomColor: "transparent",
                                    }}
                                  >
                                    <TableCell
                                      sx={{
                                        width: "20px",
                                      }}
                                      rowSpan={2}
                                    >
                                      {" "}
                                      <IOSSwitch
                                        sx={{ m: 1 }}
                                        checked={!!domain.isActive}
                                        onChange={() =>
                                          handleSwitchChange(domain)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderRight: "1px solid #eaeff2 ",
                                        textAlign: "left",
                                        width: "250px",
                                      }}
                                      rowSpan={2}
                                    >
                                      <Box>
                                        <Box
                                          sx={{
                                            fontSize: "1rem",
                                            marginBottom: ".5rem",
                                          }}
                                        >
                                          {domain.type}
                                        </Box>

                                        <TableImages
                                          domain={domain.id}
                                          user={user}
                                        />
                                      </Box>
                                    </TableCell>

                                    <TableCell
                                      sx={{
                                        borderTopColor: "transparent",
                                        borderBottomColor: "1px solid",

                                        textAlign: "center !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 4,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,

                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M16.667 15c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667H3.333c-.916 0-1.666.75-1.666 1.667v8.333c0 .917.75 1.667 1.666 1.667h-2.5a.836.836 0 00-.833.833c0 .459.375.834.833.834h18.334a.836.836 0 00.833-.834.836.836 0 00-.833-.833h-2.5zM4.167 5h11.666c.459 0 .834.375.834.833V12.5a.836.836 0 01-.834.833H4.167a.836.836 0 01-.834-.833V5.833c0-.458.375-.833.834-.833z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <MobileVisitor
                                            domain={domain}
                                            state={state}
                                            selectedPeriod={selectedPeriod}
                                            value={"laptop"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <MobileVisitor
                                            domain={domain}
                                            state={state}
                                            selectedPeriod={selectedPeriod}
                                            value={"mobile"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                      </Box>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderTopColor: "transparent",
                                        borderBottomColor: "1px solid",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 4,
                                          // justifyContent: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,

                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M16.667 15c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667H3.333c-.916 0-1.666.75-1.666 1.667v8.333c0 .917.75 1.667 1.666 1.667h-2.5a.836.836 0 00-.833.833c0 .459.375.834.833.834h18.334a.836.836 0 00.833-.834.836.836 0 00-.833-.833h-2.5zM4.167 5h11.666c.459 0 .834.375.834.833V12.5a.836.836 0 01-.834.833H4.167a.836.836 0 01-.834-.833V5.833c0-.458.375-.833.834-.833z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <MobileClicks
                                            domain={domain}
                                            clickMobile={clickMobile}
                                            selectedPeriod={selectedPeriod}
                                            value={"laptop"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <MobileClicks
                                            domain={domain}
                                            clickMobile={clickMobile}
                                            selectedPeriod={selectedPeriod}
                                            value={"mobile"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                      </Box>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderTopColor: "transparent",
                                        borderBottomColor: "1px solid",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 4,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,

                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M16.667 15c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667H3.333c-.916 0-1.666.75-1.666 1.667v8.333c0 .917.75 1.667 1.666 1.667h-2.5a.836.836 0 00-.833.833c0 .459.375.834.833.834h18.334a.836.836 0 00.833-.834.836.836 0 00-.833-.833h-2.5zM4.167 5h11.666c.459 0 .834.375.834.833V12.5a.836.836 0 01-.834.833H4.167a.836.836 0 01-.834-.833V5.833c0-.458.375-.833.834-.833z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <ClicksRate
                                            selectedPeriod={selectedPeriod}
                                            state={state}
                                            clickMobile={clickMobile}
                                            domain={domain}
                                            value={"laptop"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <span>
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              svg-inline=""
                                              role="presentation"
                                              focusable="false"
                                              // tabindex="-1"
                                            >
                                              <path
                                                d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
                                                fill={themColor.tertiary}
                                              ></path>
                                            </svg>
                                          </span>
                                          <ClicksRate
                                            selectedPeriod={selectedPeriod}
                                            state={state}
                                            clickMobile={clickMobile}
                                            domain={domain}
                                            value={"mobile"}
                                            date1={date1}
                                            date2={date2}
                                          />
                                        </Box>
                                      </Box>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderLeft: "1px solid #eaeff2 ",
                                        width: "150px",
                                        textAlign: "center",
                                      }}
                                      rowSpan={2}
                                    >
                                      <Box>
                                        <Box
                                          sx={{
                                            overflow: "unset",
                                            display: "inline-block",
                                            position: "relative",
                                            alignItems: "center",
                                          }}
                                        >
                                          <span
                                            style={{
                                              border: `1px solid ${themColor.neutral}`,
                                              borderRadius: "5px",
                                              display: "inline-flex",
                                              alignItems: "center",
                                              lineHeight: "100%",
                                              transition:
                                                "background 0.3s ease-in-out",
                                              fontSize: ".8rem",
                                              textAlign: "center",
                                              // fontFamily: "Rubik, sans-serif",
                                              color: themColor.secondary,
                                            }}
                                          >
                                            <Link
                                              href={`/update-widget/${domain.id}`}
                                              style={{
                                                display: "inline-block",
                                                padding: "5px 8px",
                                                borderRight: `1px solid ${themColor.neutral}`,
                                                color: themColor.secondary,
                                                fontSize: "12px",
                                                fontWeight: 400,
                                                lineHeight: "100%",
                                                verticalAlign: "top",
                                              }}
                                            >
                                              Edit
                                            </Link>
                                            <ClickAwayListener
                                              onClickAway={() => {
                                                if (
                                                  activeEditId === domain.id
                                                ) {
                                                  setActiveEditId(null);
                                                }
                                              }}
                                            >
                                              <span
                                                onClick={() => {
                                                  SetData(domain.id);
                                                  if (
                                                    activeEditId === domain.id
                                                  ) {
                                                    setActiveEditId(null);
                                                  } else {
                                                    setActiveEditId(domain.id);
                                                  }
                                                }}
                                                style={{
                                                  // position: "relative",
                                                  display: "inline-block",
                                                  padding: "2px 4px",
                                                  cursor: "pointer",
                                                  lineHeight: "100%",
                                                }}
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
                                                  // tabindex="-1"
                                                >
                                                  <path
                                                    d="M8 8.667a.667.667 0 100-1.334.667.667 0 000 1.334zM8 4a.667.667 0 100-1.333A.667.667 0 008 4zM8 13.333A.667.667 0 108 12a.667.667 0 000 1.333z"
                                                    stroke="currentColor"
                                                    stroke-width="1.33"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></path>
                                                </svg>

                                                {/* {activeEditId === domain.id && (
                                                // <>
                                                <Card
                                                  sx={{
                                                    position: "absolute",
                                                    width: "200px",
                                                    top: 132,
                                                    right: 15,
                                                    padding: "8px",
                                                    textAlign: "left",
                                                    background: "#fff",
                                                    border: "1px solid #eaeff2",
                                                    height: "175px",
                                                    boxShadow:
                                                      "0 11.5px 19.5px -4.875px rgba(0,0,0,.2)",
                                                    borderRadius: "8px",
                                                    zIndex: 99,
                                                  }}
                                                >
                                                  <List
                                                    sx={{
                                                      padding: 0,
                                                      margin: 0,
                                                      fontSize: "1rem",
                                                      fontFamily:
                                                        "Rubik, sans-serif",
                                                      color:
                                                        themColor.secondary,
                                                      lineHeight: 1.15,
                                                    }}
                                                  >
                                                    <ListItem disablePadding>
                                                      <ListItemButton
                                                        onClick={() =>
                                                          setRename(true)
                                                        }
                                                        sx={{
                                                          padding: "10px",
                                                          marginBottom: "8px",
                                                          borderRadius: "8px",
                                                        }}
                                                        aria-label="Rename"
                                                      >
                                                        <ListItemIcon
                                                          sx={{
                                                            fontSize: "1.25rem",
                                                          }}
                                                        >
                                                          <DriveFileRenameOutlineIcon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                          primary="Rename"
                                                          sx={{
                                                            fontSize: "0.9rem",
                                                          }}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                      <ListItemButton
                                                        onClick={() =>
                                                          setChangeDomain(true)
                                                        }
                                                        sx={{
                                                          padding: "10px",
                                                          marginBottom: "8px",
                                                          borderRadius: "8px",
                                                        }}
                                                        aria-label="Change Domain"
                                                      >
                                                        <ListItemIcon
                                                          sx={{
                                                            fontSize: "1.25rem",
                                                          }}
                                                        >
                                                          <LanguageIcon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                          primary="Change Domain"
                                                          sx={{
                                                            fontSize: "0.9rem",
                                                          }}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                    <ListItem
                                                      disablePadding
                                                      sx={{
                                                        borderTop:
                                                          "2px solid #eaeff2",
                                                        paddingTop: "5px",
                                                      }}
                                                    >
                                                      <ListItemButton
                                                        onClick={() =>
                                                          deleteDomains(domain)
                                                        }
                                                        sx={{
                                                          padding: "10px",
                                                          marginBottom: "8px",
                                                          marginTop: "3px",
                                                          borderRadius: "8px",
                                                        }}
                                                        aria-label="Delete"
                                                      >
                                                        <ListItemIcon
                                                          sx={{
                                                            fontSize: "1.25rem",
                                                          }}
                                                        >
                                                          <DeleteOutlineRounded
                                                            sx={{
                                                              color: "#ff424d",
                                                            }}
                                                          />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                          primary="Delete"
                                                          sx={{
                                                            color: "#ff424d",
                                                            fontSize: "0.9rem",
                                                          }}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                  </List>
                                                </Card>
                                                // </>
                                              )} */}
                                              </span>
                                            </ClickAwayListener>
                                          </span>
                                          {/*  */}

                                          {/*  */}
                                        </Box>
                                      </Box>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          alignItems: "center",
                                        }}
                                      >
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            svg-inline=""
                                            role="presentation"
                                            focusable="false"
                                            // tabindex="-1"
                                          >
                                            <path
                                              d="M4 7c0-.55.45-1 1-1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-1.1 0-2 .9-2 2v11h-.5c-.83 0-1.5.67-1.5 1.5S.67 20 1.5 20H14v-3H4V7zm19 1h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
                                              fill={themColor.tertiary}
                                              opacity=".6"
                                            ></path>
                                          </svg>
                                        </span>
                                        <MobileVisitor
                                          domain={domain}
                                          state={state}
                                          selectedPeriod={selectedPeriod}
                                          value={"All"}
                                          date1={date1}
                                          date2={date2}
                                        />
                                      </Box>
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          alignItems: "center",
                                        }}
                                      >
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            svg-inline=""
                                            role="presentation"
                                            focusable="false"
                                            // tabindex="-1"
                                          >
                                            <path
                                              d="M4 7c0-.55.45-1 1-1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-1.1 0-2 .9-2 2v11h-.5c-.83 0-1.5.67-1.5 1.5S.67 20 1.5 20H14v-3H4V7zm19 1h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
                                              fill={themColor.tertiary}
                                              opacity=".6"
                                            ></path>
                                          </svg>
                                        </span>
                                        <MobileClicks
                                          domain={domain}
                                          clickMobile={clickMobile}
                                          selectedPeriod={selectedPeriod}
                                          value={"All"}
                                          date1={date1}
                                          date2={date2}
                                        />
                                      </Box>
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          alignItems: "center",
                                        }}
                                      >
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            svg-inline=""
                                            role="presentation"
                                            focusable="false"
                                            // tabindex="-1"
                                          >
                                            <path
                                              d="M4 7c0-.55.45-1 1-1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-1.1 0-2 .9-2 2v11h-.5c-.83 0-1.5.67-1.5 1.5S.67 20 1.5 20H14v-3H4V7zm19 1h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
                                              fill={themColor.tertiary}
                                              opacity=".6"
                                            ></path>
                                          </svg>
                                        </span>
                                        <ClicksRate
                                          selectedPeriod={selectedPeriod}
                                          state={state}
                                          clickMobile={clickMobile}
                                          domain={domain}
                                          value={"AllTime"}
                                          date1={date1}
                                          date2={date2}
                                        />
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </>
                            );
                          })}
                      </Table>
                    </TableContainer>

                    {domains
                      .filter(
                        (dom: any) => dom.domainName === domain.domainName
                      )
                      .map((filteredDomain, index) => (
                        <React.Fragment key={index}>
                          {activeEditId === filteredDomain.id && (
                            // <>
                            <Card
                              sx={{
                                position: "absolute",
                                width: "200px",
                                top: 132 + index * 132,
                                right: screenWidth >= 1020 ? 42 : 15, // Dynamic right value
                                // right: 15,
                                padding: "8px",
                                textAlign: "left",
                                background: "#fff",
                                border: "1px solid #eaeff2",
                                height: "175px",
                                boxShadow:
                                  "0 11.5px 19.5px -4.875px rgba(0,0,0,.2)",
                                borderRadius: "8px",
                                zIndex: 99,
                              }}
                            >
                              <List
                                sx={{
                                  padding: 0,
                                  margin: 0,
                                  fontSize: "1rem",
                                  fontFamily: "Rubik, sans-serif",
                                  color: themColor.secondary,
                                  lineHeight: 1.15,
                                }}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton
                                    onClick={() => setRename(true)}
                                    sx={{
                                      padding: "10px",
                                      marginBottom: "8px",
                                      borderRadius: "8px",
                                    }}
                                    aria-label="Rename"
                                  >
                                    <ListItemIcon
                                      sx={{
                                        fontSize: "1.25rem",
                                      }}
                                    >
                                      <DriveFileRenameOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Rename"
                                      sx={{
                                        fontSize: "0.9rem",
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemButton
                                    onClick={() => setChangeDomain(true)}
                                    sx={{
                                      padding: "10px",
                                      marginBottom: "8px",
                                      borderRadius: "8px",
                                    }}
                                    aria-label="Change Domain"
                                  >
                                    <ListItemIcon
                                      sx={{
                                        fontSize: "1.25rem",
                                      }}
                                    >
                                      <LanguageIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Change Domain"
                                      sx={{
                                        fontSize: "0.9rem",
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                                <ListItem
                                  disablePadding
                                  sx={{
                                    borderTop: "2px solid #eaeff2",
                                    paddingTop: "5px",
                                  }}
                                >
                                  <ListItemButton
                                    onClick={() => deleteDomains(domain)}
                                    sx={{
                                      padding: "10px",
                                      marginBottom: "8px",
                                      marginTop: "3px",
                                      borderRadius: "8px",
                                    }}
                                    aria-label="Delete"
                                  >
                                    <ListItemIcon
                                      sx={{
                                        fontSize: "1.25rem",
                                      }}
                                    >
                                      <DeleteOutlineRounded
                                        sx={{
                                          color: "#ff424d",
                                        }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Delete"
                                      sx={{
                                        color: "#ff424d",
                                        fontSize: "0.9rem",
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            </Card>
                            // </>
                          )}
                        </React.Fragment>
                      ))}
                  </Box>
                </>
              )}
            </>
          );
        })
      )}
    </Box>
  );
};

export default TableComponet;
