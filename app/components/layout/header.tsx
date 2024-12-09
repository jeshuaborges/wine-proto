import * as React from "react";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Breadcrumbs } from "./breadcrumbs";
import { useMatches } from "@remix-run/react";

export function Header() {
  const matches = useMatches();
  const actionButtons = matches
    .filter((match) => match.handle?.actionButtons)
    .map((match, index) => {
      const button = match.handle.actionButtons;
      return React.cloneElement(button, { key: `action-button-${index}` });
    })
    .filter(Boolean);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex-1">
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-4">
          {actionButtons}
          {/* <Button variant="ghost" size="icon">
            <GearIcon className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Button variant="ghost" size="icon">
            <PersonIcon className="h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </header>
  );
}