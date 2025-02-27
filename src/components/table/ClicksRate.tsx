import React from "react";

const ClicksRate = ({
  clickMobile,
  domain,
  selectedPeriod,
  value,
  state,
  date1,
  date2,
}: any) => {
  const getCount = () => {
    let laptopClickRate = 0;
    let mobileClickRate = 0;
    let totalClickRate = 0;
    const getStartOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = date.getDate() - day; // Adjust when day is Sunday
      return new Date(date.setDate(diff));
    };
    const calculateVisits = (filterCondition: (visit: any) => boolean) => {
      const mobileclicks = clickMobile
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.mobile.filter(filterCondition));

      const mobileVisitsArray = state
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.mobile.filter(filterCondition));

      const allCliclsArray = clickMobile
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.dailyClicks.filter(filterCondition));

      const allVisitsArray = state
        .filter((elm: any) => elm.domainId === domain._id)
        .flatMap((elu: any) => elu.dailyVisits.filter(filterCondition));

      const mobileVisits = mobileVisitsArray.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );
      const totalVisits = allVisitsArray.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );
      const laptopVisits = totalVisits - mobileVisits;

      const mobileclick = mobileclicks.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );

      const totalClciks = allCliclsArray.reduce(
        (acc: number, visit: any) => acc + (visit.count || 0),
        0
      );

      const laptopClicks = totalClciks - mobileclick;

      laptopClickRate = (laptopClicks / laptopVisits) * 100 || 0;
      mobileClickRate = (mobileclick / mobileVisits) * 100 || 0;
      totalClickRate = (totalClciks / totalVisits) * 100 || 0;
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

    return { laptopClickRate, mobileClickRate, totalClickRate };
  };
  const { laptopClickRate, mobileClickRate, totalClickRate } = getCount();

  return (
    <div
      // style={{
      //   fontSize: "12px",
      // }}
    >
      {value === "laptop"
        ? `${laptopClickRate.toFixed(1)}%`
        : value === "mobile"
        ? `${mobileClickRate.toFixed(1)}%`
        : `${totalClickRate.toFixed(1)}%`}
    </div>
  );
};

export default ClicksRate;
