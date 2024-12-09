import type { CustomerQuery } from "~/types/customer-query";

export const mockQueries: CustomerQuery[] = [
  {
    id: "1",
    name: "High Value Wine Club Members",
    description: "Members who spend over $1000 annually on wine club shipments",
    conditions: [
      {
        field: "purchaseBehavior.totalSpend",
        operator: "greaterThan",
        value: 1000,
        unit: "dollars"
      },
      {
        field: "wineClubActivity.membershipStatus",
        operator: "equals",
        value: "active"
      }
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T12:30:00Z",
    lastRun: "2024-01-15T12:30:00Z",
    matchCount: 250,
    isSaved: true
  },
  {
    id: "2",
    name: "Recent Event Attendees",
    description: "Customers who attended events in the last 3 months",
    conditions: [
      {
        field: "engagementMetrics.eventAttendance",
        operator: "greaterThan",
        value: 0
      },
      {
        field: "engagementMetrics.lastEventDate",
        operator: "inLast",
        value: 90,
        unit: "days"
      }
    ],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    lastRun: "2024-01-15T09:15:00Z",
    matchCount: 175,
    isSaved: true
  }
];