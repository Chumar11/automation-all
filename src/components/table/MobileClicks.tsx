import { Box } from "@mui/material";
import React from "react";

const MobileClicks = ({
  domain,
  selectedPeriod,
  clickMobile,
  value,
  date1,
  date2,
}: any) => {
  const getCount = () => {
    let laptopVisits = 0;
    let mobileVisits = 0;
    let totalVisits = 0;

    const getStartOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = date.getDate() - day; // Adjust when day is Sunday
      return new Date(date.setDate(diff));
    };
    const calculateVisits = (filterCondition: (visit: any) => boolean) => {
      const mobileVisitsArray = clickMobile
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.mobile.filter(filterCondition));

      const allVisitsArray = clickMobile
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.dailyClicks.filter(filterCondition));

      mobileVisits = mobileVisitsArray.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );

      totalVisits = allVisitsArray.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );

      laptopVisits = totalVisits - mobileVisits;
    };

    const todayDate = new Date().toISOString().split("T")[0];
    if (selectedPeriod === "today") {
      calculateVisits((visit: any) => visit.date === todayDate);
    } else if (selectedPeriod === "yesterday") {
      const yesterdayDate = new Date(
        new Date().setDate(new Date().getDate() - 1)
      )
        .toISOString()
        .split("T")[0];
      calculateVisits((visit: any) => visit.date === yesterdayDate);
    } else if (selectedPeriod === "last7days") {
      const last7DaysDate = new Date(
        new Date().setDate(new Date().getDate() - 7)
      )
        .toISOString()
        .split("T")[0];
      calculateVisits((visit: any) => visit.date >= last7DaysDate);
    } else if (selectedPeriod === "last30days") {
      const last30DaysDate = new Date(
        new Date().setDate(new Date().getDate() - 30)
      )
        .toISOString()
        .split("T")[0];
      calculateVisits((visit: any) => visit.date >= last30DaysDate);
    } else if (selectedPeriod === "thisweek") {
      const startOfWeek = getStartOfWeek(new Date());
      calculateVisits((visit: any) => {
        const visitDate = new Date(visit.date);
        return visitDate >= startOfWeek && visitDate <= new Date();
      });
    } else if (selectedPeriod === "thismonth") {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      calculateVisits((visit: any) => visit.date >= firstDayOfMonth);
    } else if (selectedPeriod === "lastmonth") {
      const today = new Date();
      const firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )
        .toISOString()
        .split("T")[0];
      const lastDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      )
        .toISOString()
        .split("T")[0];
      calculateVisits(
        (visit: any) =>
          visit.date >= firstDayOfLastMonth && visit.date <= lastDayOfLastMonth
      );
    } else if (selectedPeriod === "AllTime") {
      calculateVisits(() => true);
    } else if (selectedPeriod === "Custom") {
      if (date1 && date2 === undefined) {
        calculateVisits(
          (visit: any) =>
            new Date(visit.date).getTime() === new Date(date1).getTime()
        );
      } else if (date1 && date2) {
        calculateVisits(
          (visit: any) => visit.date >= date1 && visit.date <= date2
        );
      }
    }

    return { laptopVisits, mobileVisits, totalVisits };
  };

  const { laptopVisits, mobileVisits, totalVisits } = getCount();
  return (
    <div
      // style={{
      //   fontSize: "12px",
      // }}
    >
      {value === "laptop"
        ? laptopVisits
        : value === "mobile"
        ? mobileVisits
        : totalVisits}
    </div>
  );
};

export default MobileClicks;
