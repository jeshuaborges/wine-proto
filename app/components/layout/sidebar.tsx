import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Link, useLocation } from "@remix-run/react";
import { MenuIcon } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = useLocation().pathname;

  return (
    <div className="flex h-full">
      {/* Mobile Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r bg-background md:block", className)}>
        <SidebarContent pathname={pathname} />
      </div>
    </div>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const routes = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Customers",
      href: "/customers",
    },
    {
      title: "Segments",
      href: "/segments",
    },
    {
      title: "Queries",
      href: "/queries",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          Admin Dashboard
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <nav className="grid gap-1">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    asChild
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link to={route.href}>{route.title}</Link>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}