import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Customers", path: "/customers" },
    { label: "New Customer", path: "/customers/new" }
  ]
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Mock creating a new customer - replace with actual API call
  console.log("Creating customer:", Object.fromEntries(formData));
  
  return redirect("/customers");
}

export default function NewCustomer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Customer</h1>
        <p className="text-muted-foreground">Add a new customer to the system</p>
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
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit">Create Customer</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}