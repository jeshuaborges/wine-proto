import type { Customer } from "~/types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    preferences: {
      wineTypes: ["Red", "White"],
      tastingNotes: ["Fruity", "Bold"],
      communicationPreferences: {
        email: true,
        sms: true,
        phone: false,
      },
    },
    addresses: [
      {
        id: "addr1",
        type: "shipping",
        street: "123 Main St",
        city: "Wine City",
        state: "CA",
        zipCode: "12345",
        isDefault: true,
        isCompliant: true,
      },
    ],
    purchaseHistory: [
      {
        id: "p1",
        date: "2024-01-15",
        products: [
          {
            id: "wine1",
            name: "Cabernet Sauvignon",
            quantity: 2,
            price: 45.99,
          },
        ],
        total: 91.98,
      },
    ],
    eventHistory: [
      {
        id: "e1",
        eventName: "Summer Wine Tasting",
        date: "2024-01-10",
        status: "attended",
        notes: "Enjoyed the reds",
      },
    ],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "(555) 234-5678",
    preferences: {
      wineTypes: ["Red", "Sparkling"],
      tastingNotes: ["Full-bodied", "Complex"],
      communicationPreferences: {
        email: true,
        sms: false,
        phone: true,
      },
    },
    addresses: [
      {
        id: "addr2",
        type: "shipping",
        street: "456 Vine Ave",
        city: "Wine Valley",
        state: "CA",
        zipCode: "12346",
        isDefault: true,
        isCompliant: true,
      },
    ],
    purchaseHistory: [
      {
        id: "p2",
        date: "2024-01-10",
        products: [
          {
            id: "wine2",
            name: "Reserve Pinot Noir",
            quantity: 1,
            price: 75.99,
          },
        ],
        total: 75.99,
      },
    ],
    eventHistory: [
      {
        id: "e2",
        eventName: "Wine Club Dinner",
        date: "2024-01-05",
        status: "attended",
        notes: "VIP member",
      },
    ],
  },
];