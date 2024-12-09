import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Copy, Pencil, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockSegments } from "~/data/mock-segments";

export function SegmentList() {
  return (
    <div className="rounded-md border">
      <div className="block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Customers</TableHead>
              <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSegments.map((segment) => (
              <TableRow key={segment.id}>
                <TableCell>
                  <Link 
                    to={`/segments/${segment.id}`}
                    className="block hover:underline"
                  >
                    <p className="font-medium">{segment.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1 sm:hidden">
                      {segment.type} • {segment.customerCount?.toLocaleString()} customers
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {segment.description}
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10">
                    {segment.type}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {segment.customerCount?.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDistanceToNow(new Date(segment.updatedAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/segments/${segment.id}`}>
                        <Users className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
                      <Link to={`/segments/${segment.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}