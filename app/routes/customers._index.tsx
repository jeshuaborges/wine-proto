import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { CustomerList } from "~/components/customers/customer-list";
import { PlusIcon } from "@radix-ui/react-icons";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Customers", path: "/customers" }
  ]
};

export default function CustomersIndex() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Button asChild>
          <Link to="/customers/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </div>
      <CustomerList />
    </div>
  );
}