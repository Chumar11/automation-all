import React, { useContext, useEffect, useState } from "react";
import AboutHeader from "@/src/components/aboutpageComponents/AboutHeader";
import TableComponet from "@/src/components/table/TableComponet";
import { Box } from "@mui/material";
import { AuthGuard } from "@/src/guards";
import Header from "@/src/components/home/header";
import { SettingsContext } from "@/src/contexts/SettingsContext";

import Alert from "@/src/components/UI/Dialogue";
import SubscriptionAlert from "@/src/components/UI/subscription-alert";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useQuery } from "react-query";
import * as api from "src/services";

const index = () => {
  const [open, setOpen] = useState(false);

  const { user, updateUser }: any = useContext(AuthContext);

  const {
    selectedPeriod,
    setSelectedPeriod,
    startDate, // Add this
    setStartDate, // Add this
    endDate, // Add this
    setEndDate, // Add this
    domains,
  } = useContext(SettingsContext);

  // const { data: myselfData } = useQuery(["user"], () => api.getMySelf(), {
  //   staleTime: 0,
  //   refetchOnWindowFocus: true,
  // });
  // useEffect(() => {
  //   if (myselfData) {
  //     localStorage.setItem("user", JSON.stringify(myselfData));

  //     updateUser(myselfData);
  //   }
  // }, [myselfData, updateUser]);

  const { data: myselfData } = useQuery(["user"], () => api.getMySelf(), {
    staleTime: 0,
    refetchOnWindowFocus: false, // Ye disable kar dega refetching on focus
  });

  useEffect(() => {
    if (!myselfData) return; // Agar data nahi hai, toh kuch mat karo

    const storedUser = localStorage.getItem("user");
    if (storedUser && JSON.stringify(myselfData) === storedUser) return;
    // Agar data pehle se same hai toh kuch mat karo

    localStorage.setItem("user", JSON.stringify(myselfData));
    updateUser(myselfData);
  }, [myselfData, updateUser]);

  return (
    <>
      {user?.plan === "free" ? (
        <SubscriptionAlert setOpen={setOpen} />
      ) : (
        <>
          <AuthGuard>
            <Box
              sx={{
                margin: "0 auto",
                maxWidth: "1500px",
                padding: "20px 20px",
                width: "100%",
              }}
            >
              <Header
                name="Widgets"
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={(period: any) => setSelectedPeriod(period)}
                startDate={startDate} // Add this
                setStartDate={setStartDate} // Add this
                endDate={endDate} // Add this
                setEndDate={setEndDate} // Add this
                domains={domains}
              />
              <TableComponet />
            </Box>
          </AuthGuard>
        </>
      )}
      {open && <Alert open={open} setOpen={setOpen} />}
    </>
  );
};

export default index;
