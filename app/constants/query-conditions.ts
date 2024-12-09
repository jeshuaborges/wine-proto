export const FIELD_CATEGORIES = {
  customerAttributes: {
    label: "Customer Attributes",
    fields: {
      age: { label: "Age", type: "number", unit: "years" },
      location: { label: "Location", type: "location" },
      addressCity: { label: "City", type: "string" },
      addressState: { 
        label: "State", 
        type: "select",
        options: [
          { value: "CA", label: "California" },
          { value: "OR", label: "Oregon" },
          { value: "WA", label: "Washington" },
          { value: "NV", label: "Nevada" },
          { value: "AZ", label: "Arizona" }
        ]
      },
      addressZipCode: { label: "ZIP Code", type: "string" },
      addressIsCompliant: { 
        label: "Address Compliance", 
        type: "select",
        options: [
          { value: "true", label: "Compliant" },
          { value: "false", label: "Non-Compliant" }
        ]
      },
      interests: { label: "Interests", type: "multiSelect" },
      joinDate: { label: "Join Date", type: "date" },
      acquisitionChannel: { label: "Acquisition Channel", type: "select" },
      notes: { label: "Notes", type: "string" }
    }
  },
  purchaseBehavior: {
    label: "Purchase Behavior",
    fields: {
      totalSpend: { label: "Total Spend", type: "number", unit: "dollars" },
      averageOrderValue: { label: "Average Order Value", type: "number", unit: "dollars" },
      purchaseFrequency: { label: "Purchase Frequency", type: "number", unit: "days" },
      productsOwned: { label: "Products Purchased", type: "multiSelect" },
      lastPurchaseDate: { label: "Last Purchase Date", type: "date" },
      preferredVarietals: { label: "Preferred Varietals", type: "multiSelect" },
      pricePointPreferences: { label: "Price Point Preferences", type: "range", unit: "dollars" }
    }
  },
  wineClubActivity: {
    label: "Wine Club Activity",
    fields: {
      membershipStatus: { 
        label: "Membership Status", 
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" }
        ]
      },
      tierLevel: { 
        label: "Tier Level", 
        type: "select",
        options: [
          { value: "bronze", label: "Bronze" },
          { value: "silver", label: "Silver" },
          { value: "gold", label: "Gold" },
          { value: "platinum", label: "Platinum" }
        ]
      },
      membershipLength: { label: "Length of Membership", type: "number", unit: "months" },
      shipmentPreferences: { 
        label: "Shipment Preferences", 
        type: "multiSelect",
        options: [
          { value: "red", label: "Red Wine" },
          { value: "white", label: "White Wine" },
          { value: "mixed", label: "Mixed" },
          { value: "quarterly", label: "Quarterly" },
          { value: "monthly", label: "Monthly" }
        ]
      },
      paymentHistory: { 
        label: "Payment History", 
        type: "select",
        options: [
          { value: "excellent", label: "Excellent" },
          { value: "good", label: "Good" },
          { value: "fair", label: "Fair" },
          { value: "poor", label: "Poor" }
        ]
      }
    }
  },
  engagementMetrics: {
    label: "Engagement Metrics",
    fields: {
      emailInteraction: { 
        label: "Email Interaction", 
        type: "select",
        options: [
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
          { value: "none", label: "None" }
        ]
      },
      eventAttendance: { label: "Event Attendance", type: "number" },
      websiteVisits: { label: "Website Visits", type: "number" },
      tastingRoomVisits: { label: "Tasting Room Visits", type: "number" },
      socialMediaEngagement: { 
        label: "Social Media Engagement",
        type: "select",
        options: [
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
          { value: "none", label: "None" }
        ]
      }
    }
  }
} as const;

export const OPERATORS = {
  string: [
    { value: "equals", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" }
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "greaterThan", label: "Greater Than" },
    { value: "lessThan", label: "Less Than" },
    { value: "between", label: "Between" }
  ],
  date: [
    { value: "equals", label: "Equals" },
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
    { value: "between", label: "Between" },
    { value: "inLast", label: "In Last" }
  ],
  select: [
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Does Not Equal" }
  ],
  multiSelect: [
    { value: "includes", label: "Includes" },
    { value: "excludes", label: "Excludes" },
    { value: "includesAll", label: "Includes All" },
    { value: "includesAny", label: "Includes Any" }
  ],
  range: [
    { value: "between", label: "Between" },
    { value: "notBetween", label: "Not Between" }
  ]
} as const;