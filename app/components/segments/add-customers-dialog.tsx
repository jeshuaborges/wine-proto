import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Checkbox } from '~/components/ui/checkbox';
import { UserPlus } from 'lucide-react';
import { mockCustomers } from '~/data/mock-customers';
import { mockSegmentCustomers } from '~/data/mock-segment-customers';

const formSchema = z.object({
  searchQuery: z.string().default(''),
  selectedCustomers: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

export function AddCustomersDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: '',
      selectedCustomers: [],
    },
  });

  // Filter out customers that are already in the segment
  const availableCustomers = mockCustomers.filter(
    (customer) => !mockSegmentCustomers.find((sc) => sc.id === customer.id)
  );

  const filteredCustomers = availableCustomers.filter((customer) => {
    const searchQuery = form.watch('searchQuery').toLowerCase();
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery)
    );
  });

  const onSubmit = (data: FormValues) => {
    console.log('Adding customers:', data.selectedCustomers);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add Customers to Segment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Customers</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search by name or email..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <FormField
                    key={customer.id}
                    control={form.control}
                    name="selectedCustomers"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-4 rounded-lg border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(customer.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, customer.id]);
                              } else {
                                field.onChange(
                                  currentValue.filter(
                                    (id) => id !== customer.id
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.watch('selectedCustomers').length}
              >
                Add Selected ({form.watch('selectedCustomers').length})
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}