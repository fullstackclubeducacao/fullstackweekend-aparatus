"use client";

import { authClient } from "@/lib/auth-client";
import {
  CalendarDaysIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SheetClose } from "./ui/sheet";

const SidebarMenu = () => {
  const { data: session } = authClient.useSession();

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex h-full flex-col gap-6 py-6">
      {/* User Section */}
      <div className="px-5">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <p className="text-base font-semibold">{session.user.name}</p>
              <p className="text-muted-foreground text-xs">
                {session.user.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex h-12 items-center">
              <p className="text-base font-semibold">Olá. Faça seu login!</p>
            </div>
            <Button
              onClick={handleLogin}
              className="gap-3 rounded-full px-6 py-3"
            >
              <span className="text-sm font-semibold">Login</span>
              <LogInIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col">
        <SheetClose asChild>
          <Link href="/">
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-3 rounded-full px-5 py-3"
            >
              <HomeIcon className="size-4" />
              <span className="text-sm font-medium">Início</span>
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/bookings">
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-3 rounded-full px-5 py-3"
            >
              <CalendarDaysIcon className="size-4" />
              <span className="text-sm font-medium">Agendamentos</span>
            </Button>
          </Link>
        </SheetClose>
      </div>

      <Separator />

      {/* Category Buttons */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Cabelo</span>
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Barba</span>
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Acabamento</span>
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Sombrancelha</span>
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Massagem</span>
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
        >
          <span className="text-sm font-medium">Hidratação</span>
        </Button>
      </div>

      <Separator />

      {/* Logout Button */}
      {session?.user && (
        <SheetClose asChild>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 rounded-full px-5 py-3"
          >
            <LogOutIcon className="size-4" />
            <span className="text-muted-foreground text-sm font-medium">
              Sair da conta
            </span>
          </Button>
        </SheetClose>
      )}
    </div>
  );
};

export default SidebarMenu;
