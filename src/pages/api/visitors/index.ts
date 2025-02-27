import Visitor from "@/src/lib/models/visitor";
import { NextApiRequest, NextApiResponse } from "next";

interface VisitData {
  date: string;
  count: number;
}

interface WeeklyVisitData {
  week: string;
  count: number;
}

interface MonthlyVisitData {
  month: string;
  count: number;
}

interface Visit {
  date: string; // or Date if you store it as a Date object
  count: number;
  week: string;
  month: string;
  // Add other properties as needed
}
interface VisitorDocument {
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
      const { domainId, visitorId, userId, mobile } = req.body as {
        domainId: string;
        visitorId: string;
        userId: string;
        mobile: boolean; // Ensure userId is passed in the body
      };

      if (!domainId || !visitorId || !userId) {
        return res
          .status(400)
          .json({ message: "Missing domainName, visitorId, or userId" });
      }

      const today = new Date();
      const todayDate = today.toISOString().split("T")[0];
      const weekNumber = getWeekNumber(today);
      const month = today.toISOString().split("T")[0].slice(0, 7);

      try {
        const visitorData = (await Visitor.findOneAndUpdate(
          { domainId, userId }, // Ensure the query includes userId
          {
            $setOnInsert: {
              mobile: [],
              dailyVisits: [],
              weeklyVisits: [],
              monthlyVisits: [],
            },
          },
          { new: true, upsert: true }
        )) as VisitorDocument | null;

        if (!visitorData) {
          return res
            .status(500)
            .json({ message: "Error initializing visitor data" });
        }

        const existingVisitor = await Visitor.findOne({ domainId, userId }); // Query by userId and domainName
        if (mobile) {
          if (
            !existingVisitor?.mobile?.some(
              (visit: Visit) => visit.date === todayDate
            )
          ) {
            await Visitor.updateOne(
              { domainId, userId }, // Ensure the query includes userId
              { $addToSet: { mobile: { date: todayDate, count: 1 } } }
            );
          } else {
            await Visitor.updateOne(
              { domainId, userId, "mobile.date": todayDate }, // Ensure the query includes userId
              { $inc: { "mobile.$.count": 1 } }
            );
          }
        }

        // Handle dailyVisits
        if (
          !existingVisitor?.dailyVisits?.some(
            (visit: Visit) => visit.date === todayDate
          )
        ) {
          await Visitor.updateOne(
            { domainId, userId }, // Ensure the query includes userId
            { $addToSet: { dailyVisits: { date: todayDate, count: 1 } } }
          );
        } else {
          await Visitor.updateOne(
            { domainId, userId, "dailyVisits.date": todayDate }, // Ensure the query includes userId
            { $inc: { "dailyVisits.$.count": 1 } }
          );
        }

        // Handle weeklyVisits
        if (
          !existingVisitor?.weeklyVisits?.some(
            (visit: Visit) => visit.week === weekNumber
          )
        ) {
          await Visitor.updateOne(
            { domainId, userId }, // Ensure the query includes userId
            { $addToSet: { weeklyVisits: { week: weekNumber, count: 1 } } }
          );
        } else {
          await Visitor.updateOne(
            { domainId, userId, "weeklyVisits.week": weekNumber }, // Ensure the query includes userId
            { $inc: { "weeklyVisits.$.count": 1 } }
          );
        }

        // Handle monthlyVisits
        if (
          !existingVisitor?.monthlyVisits?.some(
            (visit: Visit) => visit.month === month
          )
        ) {
          await Visitor.updateOne(
            { domainId, userId }, // Ensure the query includes userId
            { $addToSet: { monthlyVisits: { month, count: 1 } } }
          );
        } else {
          await Visitor.updateOne(
            { domainId, userId, "monthlyVisits.month": month }, // Ensure the query includes userId
            { $inc: { "monthlyVisits.$.count": 1 } }
          );
        }

        return res
          .status(200)
          .json({ message: "Visitor tracked successfully" });
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
      console.log("userId", userId, filter);
      console.log("datewhichgetsfromuser", date1, date2);

      if (!userId || !filter) {
        return res.status(400).json({ message: "Missing userId or filter" });
      }

      try {
        // Query the database for all visitor data matching userId
        const visitorDataList = await Visitor.find({ userId });
        console.log("visitorData", visitorDataList.length);

        // If no visitor data found for the given userId, return 404
        if (!visitorDataList || visitorDataList.length === 0) {
          return res
            .status(404)
            .json({ message: "No visitor data found for this user" });
        }

        let visitorCount = 0;

        // Loop through each visitorData to apply the filter logic
        for (const visitorData of visitorDataList) {
          switch (filter) {
            case "today": {
              const todayDate = new Date().toISOString().split("T")[0];
              const dailyVisit = visitorData.dailyVisits.find(
                (visit: Visit) => visit.date === todayDate
              );
              visitorCount += dailyVisit?.count || 0;
              console.log("visitorCount", visitorCount);
              break;
            }
            case "yesterday": {
              const yesterdayDate = new Date(Date.now() - 86400000)
                .toISOString()
                .split("T")[0];
              const dailyVisit = visitorData.dailyVisits.find(
                (visit: Visit) => visit.date === yesterdayDate
              );
              visitorCount += dailyVisit?.count || 0;
              break;
            }
            case "thisweek": {
              const today = new Date();
              console.log("🚀 ~ today:", today)
              
              const monday = new Date(today);
              monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday
              monday.setHours(0, 0, 0, 0); // Set to start of day

              const currentWeekVisits = visitorData.dailyVisits.filter(
                (visit: Visit) => {
                  const visitDate = new Date(visit.date);
                  visitDate.setHours(0, 0, 0, 0);
                  return visitDate >= monday && visitDate <= today;
                }
              );

              visitorCount += currentWeekVisits.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }

            case "last7days": {
              const last7Days = getLastNDays(7);
              console.log("🚀 ~ today::", last7Days)

              visitorCount += visitorData.dailyVisits
                .filter((visit: Visit) => last7Days.includes(visit.date))
                .reduce((sum: number, visit: Visit) => sum + visit.count, 0);
              break;
            }
            case "thismonth": {
              const currentMonth = new Date()
                .toISOString()
                .split("T")[0]
                .slice(0, 7);
              visitorCount += visitorData.monthlyVisits
                .filter((visit: Visit) => visit.month === currentMonth)
                .reduce((sum: number, visit: Visit) => sum + visit.count, 0);
              break;
            }
            case "last30days": {
              const last30Days = getLastNDays(30);
              visitorCount += visitorData.dailyVisits
                .filter((visit: Visit) => last30Days.includes(visit.date))
                .reduce((sum: number, visit: Visit) => sum + visit.count, 0);
              break;
            }
            case "lastmonth": {
              const lastMonth = getMonthRange(-1);
              visitorCount += visitorData.monthlyVisits
                .filter((visit: Visit) => visit.month === lastMonth)
                .reduce((sum: number, visit: Visit) => sum + visit.count, 0);
              break;
            }
            case "AllTime": {
              visitorCount += visitorData.dailyVisits.reduce(
                (sum: number, visit: Visit) => sum + visit.count,
                0
              );
              break;
            }
            case "Custom": {
              // console.log("startDate::", date1, date2);
              if (date1 === "undefined" && date2 === "undefined") {
                // Handle the case where neither date1 nor date2 is provided
                return res
                  .status(400)
                  .json({ message: "Missing date1 or date2" });
              } else if (date1 && date2 === "undefined") {
                const customRangeVisits = visitorData.dailyVisits.filter(
                  (visit: Visit) => {
                    const visitDate = new Date(visit.date);
                    const startDate = new Date(date1);
                    return visitDate.getTime() === startDate.getTime();
                  }
                );
                visitorCount += customRangeVisits.reduce(
                  (sum: number, visit: Visit) => sum + visit.count,
                  0
                );
              } else if (date1 && date2) {
                const customRangeVisits = visitorData.dailyVisits.filter(
                  (visit: Visit) => {
                    const visitDate = new Date(visit.date);
                    const startDate = new Date(date1);
                    const endDate = new Date(date2);
                    return visitDate >= startDate && visitDate <= endDate;
                  }
                );
                visitorCount += customRangeVisits.reduce(
                  (sum: number, visit: Visit) => sum + visit.count,
                  0
                );
              }

              break;
            }
          }
        }

        // Return the total visitor count after applying the filter
        return res.status(200).json({ visitorCount });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
