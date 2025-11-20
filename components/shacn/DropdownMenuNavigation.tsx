import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type DropdownMenuNavigationProps = {
  children: React.ReactNode;
  menuContent: {
    title: string;
    options: { title: string; subOptions: {option: string, path: string}[] }[];
  }[];
};

export function DropdownMenuNavigation({
  children,
  menuContent,
}: DropdownMenuNavigationProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="none">{children}</Button>
      </DropdownMenuTrigger>
      {menuContent.map((content, index) => (
        <DropdownMenuContent key={index} className="w-56" align="start">
          <DropdownMenuLabel>{content.title}</DropdownMenuLabel>
          {content.options.map((option, index) => (
            <DropdownMenuGroup key={index}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{option.title}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {option.subOptions.map((sub, index) => (
                      <Link key={index} href={sub.path}>
                        <DropdownMenuItem>{sub.option}</DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ))}
    </DropdownMenu>
  );
}
