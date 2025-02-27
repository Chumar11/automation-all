import { useEffect, useState, useContext } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { themColor } from "@/src/theme/themColor";
import { Dayjs } from "dayjs";
import { AuthContext } from "@/src/contexts/AuthContext";

interface ChartData {
  name: string;
  Visitors: number;
  UniqueClicks: number;
}

interface VisitorClicksChartProps {
  visitors: number;
  clicks: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  selectedPeriod:
    | "today"
    | "yesterday"
    | "thisweek"
    | "last7days"
    | "lastmonth"
    | "last30days"
    | "thismonth"
    | "AllTime"
    | "Custom"; // Add custom range format
}

type Periods = {
  [key: string]: string[];
};

const VisitorClicksChart: React.FC<VisitorClicksChartProps> = ({
  visitors,
  clicks,
  selectedPeriod,
  startDate,
  endDate,
}) => {
  const [visitorData, setVisitorData] = useState<any>([]);
  const [showVisitors, setShowVisitors] = useState<boolean>(true);
  const [showUniqueClicks, setShowUniqueClicks] = useState<boolean>(true);
  const [clickData, setClickData] = useState<any>([]);
  const { user }: any = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visitor data
        const visitorResponse = await fetch(`/api/visitors/${user._id}`);
        const Data = await visitorResponse.json();
        // console.log("visitorData", visitorData);

        setVisitorData(Data?.map((data: any) => data.dailyVisits));

        // Fetch click data
        const clickResponse = await fetch(`/api/clicks/${user._id}`);
        const clickedData = await clickResponse.json();
        setClickData(clickedData?.map((data: any) => data.dailyClicks));

        if (!visitorResponse.ok || !clickResponse.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedPeriod]);
  console.log(visitorData, "Visitordata");
  function getDatesFromStartOfWeekToToday(today: any) {
    const result = [];
    const todayDate = new Date(today);
    const dayOfWeek = todayDate.getDay();
    const startOfWeek = 1;
    const diff = (dayOfWeek + 7 - startOfWeek) % 7;
    const startDate = new Date(todayDate);
    startDate.setDate(todayDate.getDate() - diff);
    let currentDate = new Date(startDate);
    while (currentDate <= todayDate) {
      result.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Increment day
    }
    return result.map((date) => date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }
  function getDatesFromStartOfMonthToToday(today: Date) {
    const nextDay = new Date(today); // Create a new date object to avoid mutating the original
    nextDay.setDate(nextDay.getDate() + 1);
    const result = [];
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2); // Fixed to start from the 1st of the month

    let currentDate = new Date(startOfMonth);

    while (currentDate <= nextDay) {
      result.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(result, "result");

    return result.map((date) => date.toISOString().split("T")[0]);
  }

  function getDatesInRange(
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ): Dayjs[] {
    const datesInRange: Dayjs[] = [];

    if (startDate) {
      let currentDate = startDate;

      // If endDate is not provided, return an array with only startDate
      if (!endDate) {
        datesInRange.push(currentDate);
      } else {
        // Loop from startDate to endDate and collect all the dates
        while (
          currentDate.isBefore(endDate) ||
          currentDate.isSame(endDate, "day")
        ) {
          datesInRange.push(currentDate);
          currentDate = currentDate.add(1, "day"); // Increment to the next day
        }
      }
    }

    return datesInRange;
  }
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const generateChartData = (): ChartData[] => {
    if (selectedPeriod === "today") {
      const today = new Date();
      const dates = [today.toISOString().split("T")[0]];
      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (dates.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (dates.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return dates.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "yesterday") {
      const yesterday = new Date(Date.now() - 86400000);
      const dates = [yesterday.toISOString().split("T")[0]];
      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (dates.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (dates.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return dates.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "last7days") {
      // Get the last 7 days dates
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (last7Days.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (last7Days.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      // Map to chart format
      return last7Days.map((data) => ({
        name: data,
        Visitors: visitsByDate[data] || 0, // Sum visits for each day
        UniqueClicks: clicksByDate[data] || 0, // Sum clicks for each day
      }));
    } else if (selectedPeriod === "thisweek") {
      const today = new Date();
      const dates = getDatesFromStartOfWeekToToday(today);
      // Group visitor data by date

      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (dates.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (dates.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return dates.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "last30days") {
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (last30Days.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (last30Days.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return last30Days.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "lastmonth") {
      const dates: any[] = [];
      const today = new Date();
      const firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        2
      );
      console.log("firstDayOfLastMonth", firstDayOfLastMonth);

      const lastDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      for (
        let day = firstDayOfLastMonth;
        day <= lastDayOfLastMonth;
        day.setDate(day.getDate() + 1)
      ) {
        dates.push(new Date(day).toISOString().split("T")[0]);
      }

      console.log("dates", dates);

      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (dates.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (dates.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return dates.map((date) => ({
        name: date.slice(8, 10),
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "thismonth") {
      const today = new Date();
      const dates = getDatesFromStartOfMonthToToday(today);
      console.log("dates", dates);

      // Group visitor data by date
      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          if (dates.includes(visit.date)) {
            visitsByDate[visit.date] =
              (visitsByDate[visit.date] || 0) + visit.count;
          }
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          if (dates.includes(click.date)) {
            clicksByDate[click.date] =
              (clicksByDate[click.date] || 0) + click.count;
          }
        });
      });

      return dates.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    } else if (selectedPeriod === "Custom") {
      // Generate all dates in the range and format them as "YYYY-MM-DD"
      const dates = getDatesInRange(startDate, endDate).map((date: any) =>
        formatDate(new Date(date))
      );

      console.log("Generated dates:", dates);

      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};

      // Helper function to format date as "YYYY-MM-DD"

      // Process visitor data
      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          const formattedDate = formatDate(new Date(visit.date)); // Convert visit.date to "YYYY-MM-DD"
          if (dates.includes(formattedDate)) {
            visitsByDate[formattedDate] =
              (visitsByDate[formattedDate] || 0) + visit.count;
          }
        });
      });

      // Process click data
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          const formattedDate = formatDate(new Date(click.date)); // Convert click.date to "YYYY-MM-DD"
          if (dates.includes(formattedDate)) {
            clicksByDate[formattedDate] =
              (clicksByDate[formattedDate] || 0) + click.count;
          }
        });
      });

      // Map results into an array of objects for chart data
      const chartData = dates.map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));

      console.log("Chart data:", chartData);

      return chartData;
    } else if (selectedPeriod === "AllTime") {
      let visitsByDate: { [key: string]: number } = {};
      let clicksByDate: { [key: string]: number } = {};
      let allDates: Set<string> = new Set();
      visitorData?.forEach((array: any) => {
        array?.forEach((visit: any) => {
          visitsByDate[visit.date] =
            (visitsByDate[visit.date] || 0) + visit.count;
          allDates.add(visit.date);
        });
      });

      // Accumulate clicks by date from all click data arrays
      clickData?.forEach((array: any) => {
        array?.forEach((click: any) => {
          clicksByDate[click.date] =
            (clicksByDate[click.date] || 0) + click.count;
          allDates.add(click.date);
        });
      });

    

      return Array.from(allDates).map((date) => ({
        name: date,
        Visitors: visitsByDate[date] || 0,
        UniqueClicks: clicksByDate[date] || 0,
      }));
    }
    const data = new Date();
    const periods: Periods = {
      today: [data.toISOString().split("T")[0]],
      yesterday: [new Date(Date.now() - 86400000).toISOString().split("T")[0]],
      daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      last30days: ["Week 1", "Week 2", "Week 3", "Week 4"],
      monthly: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
    console.log(periods, "periods");

    const periodLabels = periods[selectedPeriod] || periods["daily"];
    return periodLabels.map((label: string) => ({
      name: label,
      Visitors: visitors,
      UniqueClicks: clicks,
    }));
  };

  const chartData = generateChartData();

  return (
    <Box
      sx={{
        color: themColor.secondary,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          padding: "20px 30px ",
          borderBottom: "1px solid",
          borderColor: themColor.ghost,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={showVisitors}
              onChange={(e) => setShowVisitors(e.target.checked)}
              sx={{
                p: 0,
                color: themColor.goldenYellow,
                "&.Mui-checked": {
                  color: themColor.goldenYellow,
                },
              }}
            />
          }
          label="Visitors"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showUniqueClicks}
              onChange={(e) => setShowUniqueClicks(e.target.checked)}
              sx={{
                p: 0,
                color: themColor.skyBlue,
                "&.Mui-checked": {
                  color: themColor.skyBlue,
                },
              }}
            />
          }
          label="Unique Clicks"
        />
      </Box>
      <Box
        sx={{
          padding: { xs: "16px", sm: "24px", md: "32px" },
          width: "100%",
        }}
      >
        {showVisitors || showUniqueClicks ? (
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 25, left: -20, bottom: 5 }}

                // margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="5 0"
                  vertical={false}
                  horizontal={true}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: "Helvetica, Arial, sans-serif",
                    color: themColor.secondary,
                    dy: 13,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: "Helvetica, Arial, sans-serif",
                    color: themColor.secondary,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  itemStyle={{
                    fontSize: "13px",
                  }}
                />
                {showVisitors && (
                  <Line
                    type="monotone"
                    dataKey="Visitors"
                    stroke={themColor.goldenYellow}
                  />
                )}
                {showUniqueClicks && (
                  <Line
                    type="monotone"
                    dataKey="UniqueClicks"
                    stroke={themColor.skyBlue}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              py: "20px",
            }}
          >
            {[...Array(7)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1.9px solid #edf2f4",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VisitorClicksChart;
