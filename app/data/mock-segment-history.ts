import type { SegmentChange } from "~/types/segment-history";

export const mockSegmentHistory: SegmentChange[] = [
  {
    id: "1",
    segmentId: "1",
    userId: "1",
    userName: "Jane Smith",
    type: "bulk_add",
    timestamp: "2024-01-15T00:00:00Z",
    customersAffected: 50,
    details: {
      addedCustomers: ["1", "2", "3"],
    },
  },
  {
    id: "2",
    segmentId: "1",
    userId: "system",
    userName: "System",
    type: "condition_add",
    timestamp: "2024-01-14T12:00:00Z",
    customersAffected: 75,
    details: {
      addedCustomers: ["4", "5", "6"],
      condition: {
        field: "total_purchase_value",
        operator: "greater_than",
        value: 1000,
        unit: "dollars"
      }
    },
  },
  {
    id: "3",
    segmentId: "1",
    userId: "2",
    userName: "John Doe",
    type: "remove",
    timestamp: "2024-01-14T00:00:00Z",
    customersAffected: 1,
    details: {
      removedCustomers: ["7"],
    },
  },
  {
    id: "4",
    segmentId: "1",
    userId: "system",
    userName: "System",
    type: "condition_remove",
    timestamp: "2024-01-13T15:00:00Z",
    customersAffected: 25,
    details: {
      removedCustomers: ["8", "9", "10"],
      condition: {
        field: "last_purchase_date",
        operator: "in_last",
        value: 30,
        unit: "days"
      }
    },
  },
  {
    id: "5",
    segmentId: "1",
    userId: "1",
    userName: "Jane Smith",
    type: "update",
    timestamp: "2024-01-13T00:00:00Z",
    customersAffected: 0,
    details: {
      changes: {
        name: "VIP Customers",
        description: "Updated description",
      },
    },
  },
  {
    id: "6",
    segmentId: "1",
    userId: "3",
    userName: "Bob Wilson",
    type: "bulk_remove",
    timestamp: "2024-01-12T00:00:00Z",
    customersAffected: 25,
    details: {
      removedCustomers: ["11", "12", "13"],
    },
  },
];