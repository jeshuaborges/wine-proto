import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon">
        <GearIcon className="h-5 w-5" />
      </Button>
      <Separator orientation="vertical" className="h-8" />
      <Button variant="ghost" size="icon">
        <PersonIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}