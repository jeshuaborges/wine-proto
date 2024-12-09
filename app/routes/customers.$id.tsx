import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";

// Mock data - replace with actual data fetching
const mockCustomer = {
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
};

export async function loader({ params }: LoaderFunctionArgs) {
  // Replace with actual data fetching
  return json({ customer: mockCustomer });
}

export const handle = {
  breadcrumb: (data: { customer: typeof mockCustomer }) => [
    { label: "Dashboard", path: "/" },
    { label: "Customers", path: "/customers" },
    { label: `${data.customer.firstName} ${data.customer.lastName}`, path: `/customers/${data.customer.id}` }
  ]
};

export default function CustomerDetails() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Details</h1>
          <p className="text-muted-foreground">
            View and manage customer information
          </p>
        </div>
        <Button asChild>
          <Link to={`/customers/${customer.id}/edit`}>
            <Pencil2Icon className="mr-2 h-4 w-4" />
            Edit Customer
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
}