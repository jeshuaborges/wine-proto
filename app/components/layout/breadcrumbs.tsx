import { Link } from "@remix-run/react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "~/lib/utils";
import { useMatches } from "@remix-run/react";

interface Breadcrumb {
  label: string;
  path: string;
}

export function Breadcrumbs() {
  const matches = useMatches();
  
  const crumbs = matches
    // First, filter out routes that don't have handles or breadcrumbs
    .filter((match) => match.handle?.breadcrumb)
    // Then map to the breadcrumb data we need
    .map((match) => {
      const breadcrumbs = typeof match.handle?.breadcrumb === "function"
        ? match.handle.breadcrumb(match.data)
        : match.handle?.breadcrumb;

      return Array.isArray(breadcrumbs) ? breadcrumbs : [breadcrumbs];
    })
    .flat()
    .filter((crumb): crumb is Breadcrumb => Boolean(crumb?.label));

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center space-x-1">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        const isFirst = index === 0;

        return (
          <div 
            key={crumb.path} 
            className={cn(
              "flex min-w-0 items-center",
              !isLast && "flex-shrink-0"
            )}
          >
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            )}
            <Link
              to={crumb.path}
              className={cn(
                "truncate text-sm transition-colors hover:text-foreground",
                isLast 
                  ? "pointer-events-none font-medium text-foreground" 
                  : "text-muted-foreground",
                isFirst ? "flex items-center" : "max-w-[150px]"
              )}
              title={crumb.label}
            >
              {crumb.path === "/" ? (
                <Home className="h-4 w-4" />
              ) : (
                crumb.label
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}