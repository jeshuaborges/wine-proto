import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Play, Save, Copy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockQueries } from "~/data/mock-queries";

export function QueryList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Last Run</TableHead>
            <TableHead className="hidden lg:table-cell">Matches</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockQueries.map((query) => (
            <TableRow key={query.id}>
              <TableCell>
                <Link 
                  to={`/queries/${query.id}`}
                  className="block hover:underline"
                >
                  <p className="font-medium">{query.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {query.description}
                  </p>
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {query.lastRun ? (
                  formatDistanceToNow(new Date(query.lastRun), { addSuffix: true })
                ) : (
                  "Never"
                )}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {query.matchCount?.toLocaleString() ?? "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                  {!query.isSaved && (
                    <Button variant="ghost" size="icon">
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}