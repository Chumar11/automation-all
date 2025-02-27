import Click from "@/src/lib/models/click"; // Changed Visitor to ClickCount
import { NextApiRequest, NextApiResponse } from "next";

interface VisitData {
  date: string;
  count: number;
}
interface Visit {
  date: string; // or Date if you store it as a Date object
  count: number;
  week: string;
  month: string;
  // Add other properties as needed
}
interface WeeklyVisitData {
  week: string;
  count: number;
}

interface MonthlyVisitData {
  month: string;
  count: number;
}

interface ClickCountDocument {
  userId: string;
  dailyVisits: VisitData[];
  weeklyVisits: WeeklyVisitData[];
  monthlyVisits: MonthlyVisitData[];
}

type FilterType =
  | "today"
  | "yesterday"
  | "thisweek"
  | "last7days"
  | "thismonth"
  | "last30days"
  | "lastmonth"
  | "AllTime";

function getWeekNumber(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 1);

  const days = Math.floor(
    (date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
  return `${date.getFullYear()}-${Math.ceil((days + 1) / 7)}`;
}

function getLastNDays(n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toISOString().split("T")[0]);
  }
  return result;
}

function getMonthRange(offset: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return date.toISOString().split("T")[0].slice(0, 7);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      const { userId, clickId, domainId, mobile } = req.body as {
        userId: string;
        clickId: string;
        domainId: string;
        mobile: boolean;
      };
      console.log("userId", userId);
      console.log("clickId", clickId);

      if (!domainId || !clickId) {
        return res.status(400).json({ message: "Missing domainId or clickId" });
      }

      const today = new Date();
      const todayDate = today.toISOString().split("T")[0];
      const weekNumber = getWeekNumber(today);
      const month = today.toISOString().split("T")[0].slice(0, 7);

      try {
        // let clickCountData = await Click.findOne({ userId });
        // console.log("clickCountData", clickCountData);

        const clickCountData = (await Click.findOneAndUpdate(
          { userId, domainId },
          {
            $setOnInsert: {
              mobile: [],
              dailyClicks: [],
              weeklyClicks: [],
              monthlyClicks: [],
            },
          },
          { new: true, upsert: true }
        )) as ClickCountDocument | null;

        if (!clickCountData) {
          return res
            .status(500)
            .json({ message: "Error initializing clicked data" });
        }

        const existingClick = await Click.findOne({ domainId });

        if (mobile) {
          if (
            !existingClick?.mobile?.some(
              (click: Visit) => click.date === todayDate
            )
          ) {
            await Click.updateOne(
              { domainId },
              { $addToSet: { mobile: { date: todayDate, count: 1 } } }
            );
          } else {
            await Click.updateOne(
              { domainId, "mobile.date": todayDate },
              { $inc: { "mobile.$.count": 1 } }
            );
          }
        }
        if (
          !existingClick?.dailyClicks?.some(
            (click: Visit) => click.date === todayDate
          )
        ) {
          await Click.updateOne(
            { domainId },
            { $addToSet: { dailyClicks: { date: todayDate, count: 1 } } }
          );
        } else {
          await Click.updateOne(
            { domainId, "dailyClicks.date": todayDate },
            { $inc: { "dailyClicks.$.count": 1 } }
          );
        }

        // Handle weeklyClicks
        if (
          !existingClick?.weeklyClicks?.some(
            (click: Visit) => click.week === weekNumber
          )
        ) {
          await Click.updateOne(
            { domainId },
            { $addToSet: { weeklyClicks: { week: weekNumber, count: 1 } } }
          );
        } else {
          await Click.updateOne(
            { domainId, "weeklyClicks.week": weekNumber },
            { $inc: { "weeklyClicks.$.count": 1 } }
          );
        }

        // Handle monthlyClicks
        if (
          !existingClick?.monthlyClicks?.some(
            (click: Visit) => click.month === month
          )
        ) {
          await Click.updateOne(
            { domainId },
            { $addToSet: { monthlyClicks: { month, count: 1 } } }
          );
        } else {
          await Click.updateOne(
            { domainId, "monthlyClicks.month": month },
            { $inc: { "monthlyClicks.$.count": 1 } }
          );
        }

        return res
          .status(200)
          .json({ message: "Click count tracked successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "GET": {
      const { userId, filter, date1, date2 } = req.query as {
        userId: string;
        filter: string;
        date1: string;
        date2: string;
      };

      if (!userId || !filter) {
        return res.status(400).json({ message: "Missing userId or filter" });
      }

      try {
        const clickCountData = await Click.find({ userId });

        if (!clickCountData || clickCountData.length === 0) {
          return res
            .status(404)
            .json({ message: "No click count data found for this user" });
        }

        let ClickCount = 0;

        for (const data of clickCountData) {
          switch (filter) {
            case "today": {
              const todayDate = new Date().toISOString().split("T")[0];
              const dailyVisit = data.dailyClicks.find(
                (visit: Visit) => visit.date === todayDate
              );
              ClickCount += dailyVisit?.count || 0;
              break;
            }
            case "yesterday": {
              const yesterdayDate = new Date(Date.now() - 86400000)
                .toISOString()
                .split("T")[0];
              const dailyVisit = data.dailyClicks.find(
                (visit: Visit) => visit.date === yesterdayDate
              );
              ClickCount += dailyVisit?.count || 0;
              break;
            }
            case "thisweek": {
              const today = new Date();
              const monday = new Date(today);
              monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday of the week
              monday.setHours(0, 0, 0, 0);

              const currentWeekVisits = data.dailyClicks.filter((visit:Visit) => {
                const visitDate = new Date(visit.date);
                visitDate.setHours(0, 0, 0, 0);
                return visitDate >= monday && visitDate <= today;
              });

              ClickCount += currentWeekVisits.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "last7days": {
              const today = new Date();
              const last7Days: string[] = [];
              for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                last7Days.push(date.toISOString().split("T")[0]);
              }

              const weeklyClicks = data.dailyClicks.filter((visit: Visit) =>
                last7Days?.includes(visit.date)
              );
              ClickCount += weeklyClicks.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "thismonth": {
              const currentMonth = new Date()
                .toISOString()
                .split("T")[0]
                .slice(0, 7);
              const monthlyClicks = data.monthlyClicks.filter(
                (visit: Visit) => visit.month === currentMonth
              );
              ClickCount += monthlyClicks.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "last30days": {
              const today = new Date();
              const last30Days: string[] = [];
              for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                last30Days.push(date.toISOString().split("T")[0]);
              }

              const dailyClicks = data.dailyClicks.filter((visit: Visit) =>
                last30Days.includes(visit.date)
              );
              ClickCount += dailyClicks.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "lastmonth": {
              const now = new Date();
              const lastMonth = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
              );
              const lastMonthString = `${lastMonth.getFullYear()}-${String(
                lastMonth.getMonth() + 1
              ).padStart(2, "0")}`;

              const monthlyClicks = data.monthlyClicks.filter(
                (visit: Visit) => visit.month === lastMonthString
              );
              ClickCount += monthlyClicks.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "AllTime": {
              ClickCount += data.dailyClicks.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "Custom": {
              if (!date1 && !date2) {
                // Handle the case where neither date1 nor date2 is provided
                return res
                  .status(400)
                  .json({ message: "Missing date1 or date2" });
              } else if (date1 && date2 === "undefined") {
                console.log("Only startDate provided::", date1);
                const customRangeVisits = data.dailyClicks.filter(
                  (visit: Visit) => {
                    const visitDate = new Date(visit.date);
                    const startDate = new Date(date1);
                    return visitDate.getTime() === startDate.getTime();
                  }
                );
                ClickCount += customRangeVisits.reduce(
                  (sum: number, visit: Visit) => sum + visit.count,
                  0
                );
              } else if (date1 && date2) {
                const customRangeVisits = data.dailyClicks.filter(
                  (visit: Visit) => {
                    const visitDate = new Date(visit.date);
                    const startDate = new Date(date1);
                    const endDate = new Date(date2);
                    return visitDate >= startDate && visitDate <= endDate;
                  }
                );
                ClickCount += customRangeVisits.reduce(
                  (sum: number, visit: Visit) => sum + visit.count,
                  0
                );
              }
              break;
            }
          }
        }

        return res.status(200).json({ ClickCount });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
