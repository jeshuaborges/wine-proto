import type { Segment } from "~/types/segment";

export const mockSegments: Segment[] = [
  {
    id: "1",
    name: "Club - Call for order",
    description: "Call these customers to collect their club order",
    type: "manual",
    conditions: [],
    customerCount: 5,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Recent High-Value",
    description: "Customers who spent over $1000 in the last 90 days",
    type: "dynamic",
    updateFrequency: "daily",
    conditions: [
      {
        field: "total_purchase_value",
        operator: "greater_than",
        value: 1000,
        unit: "dollars"
      },
      {
        field: "last_purchase_date",
        operator: "in_last",
        value: 90,
        unit: "days"
      }
    ],
    customerCount: 250,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T12:30:00Z"
  },
  {
    id: "3",
    name: "At-Risk Members",
    description: "No purchase in last 6 months",
    type: "dynamic",
    updateFrequency: "manual",
    conditions: [
      {
        field: "last_purchase_date",
        operator: "greater_than",
        value: 180,
        unit: "days"
      }
    ],
    customerCount: 75,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T08:15:00Z"
  },
  {
    id: "4",
    name: "Local Wine Club",
    description: "Wine club members within 25 miles",
    type: "dynamic",
    updateFrequency: "weekly",
    conditions: [
      {
        field: "wine_club_status",
        operator: "equals",
        value: "active"
      },
      {
        field: "distance",
        operator: "less_than",
        value: 25,
        unit: "miles"
      }
    ],
    customerCount: 150,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z"
  }
];