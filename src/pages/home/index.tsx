import { Box } from "@mui/material";

import CardHeader from "@/src/components/home/CardHeader";
import CardHistory from "@/src/components/home/CardHistory";
import { useContext, useEffect, useState } from "react";
import Header from "@/src/components/home/header";
import { AuthGuard } from "@/src/guards";
import { AuthContext } from "@/src/contexts/AuthContext"; // Assuming you're importing AuthContext
import {
  SettingsContext,
  getUniqueDomains,
} from "@/src/contexts/SettingsContext"; // Same for SettingsContext
import VisitorClicksChart from "@/src/components/home/VisitorClicksChart";
import { themColor } from "@/src/theme/themColor";

import Alert from "@/src/components/UI/Dialogue";
import SubscriptionAlert from "@/src/components/UI/subscription-alert";
import { useQuery } from "react-query";
import * as api from "src/services";
import CreateWidget from "@/src/components/table/CreateWidget";
import EmptyWidgetList from "@/src/components/table/EmptyWidgetList";

// type SelectedPeriod =
//   | "today"
//   | "yesterday"
//   | "daily"
//   | "last30days"
//   | "monthly"
//   | "last7days";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { user, updateUser }: any = useContext(AuthContext);
  // const userId = user._id;
  // Get domains and setDomains from SettingsContext
  const {
    domains,
    setDomains,
    selectedPeriod,
    setSelectedPeriod,
    startDate, // Add this
    setStartDate, // Add this
    endDate, // Add this
    setEndDate, // Add this
  } = useContext(SettingsContext);

  const { data: myselfData } = useQuery(["user"], () => api.getMySelf(), {
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!myselfData) return;
    const storedUser = localStorage.getItem("user");
    if (storedUser && JSON.stringify(myselfData) === storedUser) return;
    localStorage.setItem("user", JSON.stringify(myselfData));
    updateUser(myselfData);
  }, [myselfData, updateUser]);

  const date1 = startDate?.format("YYYY-MM-DD");
  const date2 = endDate?.format("YYYY-MM-DD");
  useEffect(() => {
    // Ensure user is available before attempting to fetch
    if (user && user._id) {
      const fetchDomains = async () => {
        try {
          const response = await fetch(`/api/domain?userId=${user._id}`); // Use user._id
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setDomains(data); // Update the domains state with fetched data
        } catch (error) {
          console.error("Error fetching domains:", error);
        }
      };

      fetchDomains();
    }
  }, [user, setDomains]); // Add setDomains to the dependency array

  // Get unique domains by calling getUniqueDomains
  const uniqueDomains = getUniqueDomains(domains);
  const [state, setState] = useState<any>([]);

  const [clicks, setClicks] = useState<any>([]);
  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await fetch(
          `/api/visitors?userId=${user._id}&filter=${selectedPeriod}&date1=${date1}&date2=${date2}`
        );

        const data = await response.json();
        console.log("data", data);
        // console.log("user_Id", user._id);
        setState(data);
        if (!response.ok) {
          throw new Error("Failed to fetch visitor data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisitorData();
  }, [selectedPeriod, date1, date2, domains]);

  console.log("state", state);
  useEffect(() => {
    const fetchClickData = async () => {
      try {
        const response = await fetch(
          `/api/clicks?userId=${user._id}&filter=${selectedPeriod}&date1=${date1}&date2=${date2}`
        );

        const data = await response.json();
        console.log("data", data);
        setClicks(data);
        if (!response.ok) {
          throw new Error("Failed to fetch click data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchClickData();
  }, [selectedPeriod, date1, date2, domains]);

  console.log(state, "state");
  const conversion = (
    (clicks?.ClickCount / state?.visitorCount) * 100 || 0
  ).toFixed(1);

  const dashboardVisit = [
    {
      id: "1",
      tooltip:
        "The number of unique people who visited your website for the current billing month",
      name: "Visitors",
      history: state?.visitorCount || 0,
      avatarImg: "/icons/visitors.svg",
    },
    {
      id: "2",

      tooltip:
        "The number of times people clicked on the Ichonic widget on your website",
      name: "Unique Clicks",
      history: clicks?.ClickCount || 0,
      avatarImg: "/icons/unique-clicks.svg",
    },
    {
      id: "3",
      tooltip:
        "The number of times the Ichonic widget has been clicked Boxided by the number of times Ichonic widget has been shown to visitors",
      name: "Conversion Rate",
      history: `${conversion === "Infinity" ? "0" : conversion}%`,
      avatarImg: "/icons/conversation-rate.svg",
    },
  ];
  return (
    <>
      {user?.plan === "free" ? (
        <SubscriptionAlert setOpen={setOpen} />
      ) : (
        <>
          <AuthGuard>
            <Box sx={{ padding: "24px", maxWidth: "1280px", margin: "auto" }}>
              {/* <Header
                name={"Dashboard"}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={(period: any) => setSelectedPeriod(period)}
                startDate={startDate} // Add this
                setStartDate={setStartDate} // Add this
                endDate={endDate} // Add this
                setEndDate={setEndDate} // Add this
                domains={domains}
              /> */}
              {/* {domains.length === 0 && (
                <>
                  <Box>
                    <EmptyWidgetList top={"440px"} left={"57%"} />
                  </Box>
                </>
              )} 
              */}
              {/* <Box position="relative">
                {domains.length === 0 && <EmptyWidgetList />}
                <Box
                  sx={{
                    marginTop: domains.length === 0 ? "50px" : "20px",
                    pointerEvents: domains.length === 0 ? "none" : "auto",
                    filter: domains.length === 0 ? "blur(3px)" : "blur(0px)",
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: "Rubik, sans-serif",
                      display: "flex",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      flexDirection: "column",
                      marginTop: "24px",
                      backgroundColor: "#fff",
                      padding: "32px",
                      color: themColor.secondary,
                      fontWeight: 400,
                      lineHeight: 1.15,
                      marginBottom: "1rem",
                      border: "1px solid #eaeff2",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <CardHeader
                      uniqueDomains={uniqueDomains}
                      domains={domains}
                    />
                    <CardHistory dashboardVisit={dashboardVisit} />
                  </Box>

                  <Box
                    sx={{
                      marginTop: "24px",
                      backgroundColor: "#fff",
                      border: "1px solid #eaeff2",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <VisitorClicksChart
                      startDate={startDate} // Add this
                      endDate={endDate} // Add this
                      clicks={clicks?.ClickCount}
                      selectedPeriod={selectedPeriod}
                      visitors={state?.visitorCount}
                    />
                  </Box>
                </Box>
              </Box> */}
              home page
            </Box>
          </AuthGuard>
        </>
      )}
      {open && <Alert open={open} setOpen={setOpen} />}
    </>
  );
}
