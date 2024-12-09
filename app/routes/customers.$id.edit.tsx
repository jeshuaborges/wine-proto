import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// Mock data - replace with actual data fetching
const mockCustomer = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "(555) 123-4567",
};

export async function loader({ params }: ActionFunctionArgs) {
  return json({ customer: mockCustomer });
}

export const handle = {
  breadcrumb: (data: { customer: typeof mockCustomer }) => [
    { label: "Dashboard", path: "/" },
    { label: "Customers", path: "/customers" },
    { label: `${data.customer.firstName} ${data.customer.lastName}`, path: `/customers/${data.customer.id}` },
    { label: "Edit", path: `/customers/${data.customer.id}/edit` }
  ]
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Mock updating customer - replace with actual API call
  console.log("Updating customer:", Object.fromEntries(formData));
  
  return redirect(`/customers/${params.id}`);
}

export default function EditCustomer() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Customer</h1>
        <p className="text-muted-foreground">Update customer information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={customer.firstName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={customer.lastName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={customer.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={customer.phone}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Update Customer</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}