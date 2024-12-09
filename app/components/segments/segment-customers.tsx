import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Upload, Download, Search, UserMinus } from "lucide-react";
import { CustomerBulkActions } from "./customer-bulk-actions";
import { mockSegmentCustomers } from "~/data/mock-segment-customers";
import { Checkbox } from "~/components/ui/checkbox";
import { AddCustomersDialog } from "./add-customers-dialog";
import { useToast } from "~/hooks/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { CustomerBulkActionsMenu } from "./customer-bulk-actions-menu";

export function SegmentCustomers() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(mockSegmentCustomers);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveCustomer = (customerId: string, customerName: string) => {
    const removedCustomer = customers.find(c => c.id === customerId);
    if (!removedCustomer) return;

    setCustomers(customers.filter(c => c.id !== customerId));
    
    toast({
      title: "Customer removed",
      description: `${customerName} has been removed from the segment.`,
      action: (
        <ToastAction altText="Undo" onClick={() => {
          setCustomers(prev => [...prev, removedCustomer]);
        }}>
          Undo
        </ToastAction>
      ),
    });
  };

  const handleBulkRemove = () => {
    const removedCustomers = customers.filter(c => selectedCustomers.includes(c.id));
    setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
    setSelectedCustomers([]);
    
    toast({
      title: "Customers removed",
      description: `${selectedCustomers.length} customers have been removed from the segment.`,
      action: (
        <ToastAction altText="Undo" onClick={() => {
          setCustomers(prev => [...prev, ...removedCustomers]);
        }}>
          Undo
        </ToastAction>
      ),
    });
  };

  const handleBulkMove = (targetSegmentId: string) => {
    console.log(`Moving customers to segment ${targetSegmentId}:`, selectedCustomers);
    handleBulkRemove();
  };

  const handleBulkCopy = (targetSegmentId: string) => {
    console.log(`Copying customers to segment ${targetSegmentId}:`, selectedCustomers);
    toast({
      title: "Customers copied",
      description: `${selectedCustomers.length} customers have been copied to the selected segment.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {selectedCustomers.length === 0 ? (
            <>
              <CustomerBulkActions />
              <AddCustomersDialog />
            </>
          ) : (
            <CustomerBulkActionsMenu
              selectedCount={selectedCustomers.length}
              onRemove={handleBulkRemove}
              onMove={handleBulkMove}
              onCopy={handleBulkCopy}
            />
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <div className="block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredCustomers.length > 0 &&
                      filteredCustomers.every((customer) =>
                        selectedCustomers.includes(customer.id)
                      )
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCustomers(filteredCustomers.map((c) => c.id));
                      } else {
                        setSelectedCustomers([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Added</TableHead>
                <TableHead className="hidden lg:table-cell">Added By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCustomers([...selectedCustomers, customer.id]);
                        } else {
                          setSelectedCustomers(
                            selectedCustomers.filter((id) => id !== customer.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground sm:hidden">
                        {customer.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{customer.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(customer.addedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{customer.addedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveCustomer(customer.id, customer.name)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}