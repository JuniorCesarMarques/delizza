"use client";

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
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";


type DropdownMenuNavigationProps = {
  children: React.ReactNode;
  menuContent: {
    title: string;
    options: {
      title: string;
      subOptions: { option: string; path: string }[];
    }[];
  }[];
};

export function DropdownMenuNavigation({
  children,
  menuContent,
}: DropdownMenuNavigationProps) {
  const { user, logout } = useAuth();

  console.log("user", user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="none">{children}</Button>
      </DropdownMenuTrigger>
      {menuContent.map((content, index) => (
        <DropdownMenuContent key={index} className="w-56" align="start">
          {/* Admin Options */}
          {user && <div>
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
          </div>}
          {user ? (
            <DropdownMenuItem onClick={() => logout()}>
              Sair
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <Link href="/login">
              <DropdownMenuItem>
                Entrar
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      ))}
    </DropdownMenu>
  );
}
