import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "~/components/ui/navigation-menu";
import { Link, useLocation } from "@remix-run/react";

export function MainNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="text-lg font-semibold" asChild>
            <Link to="/">Admin Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={`text-sm ${isActive('/customers') ? 'font-medium' : ''}`} 
            asChild
          >
            <Link to="/customers">Customers</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={`text-sm ${isActive('/segments') ? 'font-medium' : ''}`} 
            asChild
          >
            <Link to="/segments">Segments</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={`text-sm ${isActive('/queries') ? 'font-medium' : ''}`} 
            asChild
          >
            <Link to="/queries">Queries</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}