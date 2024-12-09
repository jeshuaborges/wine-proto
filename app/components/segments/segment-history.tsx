import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { mockSegmentHistory } from "~/data/mock-segment-history";
import { mockCustomers } from "~/data/mock-customers";
import { cn } from "~/lib/utils";

export function SegmentHistory() {
  const [selectedChange, setSelectedChange] = useState<string | null>(null);

  const getCustomerDetails = (customerIds: string[]) => {
    return customerIds.map(id => 
      mockCustomers.find(c => c.id === id)
    ).filter(Boolean);
  };

  const handleCustomerClick = (changeId: string) => {
    setSelectedChange(changeId);
  };

  const selectedChangeDetails = selectedChange 
    ? mockSegmentHistory.find(change => change.id === selectedChange)
    : null;

  const getChangeTypeDisplay = (type: string) => {
    switch (type) {
      case 'condition_add':
        return 'added customers via condition';
      case 'condition_remove':
        return 'removed customers via condition';
      default:
        return type.split('_').join(' ');
    }
  };

  const getConditionDisplay = (condition: any) => {
    if (!condition) return null;
    return `${condition.field.split('_').join(' ')} ${condition.operator} ${condition.value}${condition.unit ? ` ${condition.unit}` : ''}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSegmentHistory.map((change) => (
            <div
              key={change.id}
              className="rounded-lg border"
            >
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">
                    <span className={cn(
                      "mr-2",
                      change.userId === 'system' && "text-blue-600"
                    )}>
                      {change.userName}
                    </span>
                    <span className="text-muted-foreground">
                      {getChangeTypeDisplay(change.type)}
                    </span>
                  </p>
                  {change.details?.condition && (
                    <p className="text-sm text-muted-foreground">
                      {getConditionDisplay(change.details.condition)}
                    </p>
                  )}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handleCustomerClick(change.id)}
                  >
                    {change.customersAffected} customers affected
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(change.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedChange} onOpenChange={() => setSelectedChange(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Affected Customers</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedChangeDetails && (
                <>
                  <div className="text-sm text-muted-foreground">
                    {getChangeTypeDisplay(selectedChangeDetails.type)} by {selectedChangeDetails.userName}
                    {selectedChangeDetails.details?.condition && (
                      <p className="mt-1">
                        Condition: {getConditionDisplay(selectedChangeDetails.details.condition)}
                      </p>
                    )}
                  </div>
                  {selectedChangeDetails.details?.addedCustomers?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Added Customers</h4>
                      <div className="rounded-md border">
                        <div className="divide-y">
                          {getCustomerDetails(selectedChangeDetails.details.addedCustomers).map((customer) => (
                            customer && (
                              <div key={customer.id} className="flex items-center justify-between p-2">
                                <div>
                                  <p className="font-medium">
                                    {customer.firstName} {customer.lastName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {customer.email}
                                  </p>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedChangeDetails.details?.removedCustomers?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Removed Customers</h4>
                      <div className="rounded-md border">
                        <div className="divide-y">
                          {getCustomerDetails(selectedChangeDetails.details.removedCustomers).map((customer) => (
                            customer && (
                              <div key={customer.id} className="flex items-center justify-between p-2">
                                <div>
                                  <p className="font-medium">
                                    {customer.firstName} {customer.lastName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {customer.email}
                                  </p>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {!selectedChangeDetails.details?.addedCustomers?.length && 
                   !selectedChangeDetails.details?.removedCustomers?.length && (
                    <p className="text-sm text-muted-foreground">
                      No customer details available for this change.
                    </p>
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}