"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  IconListDetails,
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconUser,
  IconMenu2,
} from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger as NavTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import UserContext from "@/features/context/user/user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import config from "@/utils/config";

const navItems = [
  {
    title: "Admin",
    url: "/",
    icon: IconUser,
    children: [
      {
        title: "User Management",
        url: "/user-management",
        children: [{ title: "manage", url: "/" }],
      },
      {
        title: "Smtp",
        url: "/smtp-configuration",
        children: [{ title: "manage", url: "/" }],
      },
      {
        title: "Leave Management",
        url: "/",
        children: [{ title: "manage", url: "/" }],
      },
    ],
  },
  { title: "Home", url: "/dashboard", icon: IconDashboard },
  { title: "Attendance & Leave", url: "/attendance", icon: IconListDetails },
  { title: "Payroll & Finance", url: "/payroll", icon: IconChartBar },
  { title: "Personal information", url: "/personal-info", icon: IconFolder },
  { title: "Inventory", url: "/inventory", icon: IconUsers },
  { title: "Documents", url: "/documents", icon: IconUsers },
];

export function SiteHeader() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData(parsed.userInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    userCtx.logout();
    window.location.href = `${
      config.OAUTH2_URL
    }/logout?redirect_uri=${encodeURIComponent(config.LOGIN_URL)}`;
  };

  return (
    <header className="flex shrink-0 w-full items-center gap-2 overflow-hidden">
      <div className="flex w-full items-center gap-2 px-2 sm:gap-4 sm:px-4 lg:gap-4 lg:px-6">
        <div className="flex w-full items-center gap-2 sm:gap-4 border shadow-sm lg:gap-4 bg-[var(--card)] p-2 sm:p-4 rounded-xl site-header overflow-hidden">
          <div className="flex gap-2 sm:gap-4 flex-none lg:flex-1 overflow-x-auto scrollbar-hide w-full">
            <SidebarTrigger className="-ml-1 shrink-0" />
            
            {/* Desktop Navigation - Hidden on smaller screens */}
            <div className="hidden 2xl:flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {navItems.map((item) =>
                item.children ? (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center gap-2 p-2 shadow-sm border font-medium text-[var(--primary-text)] bg-white/20 hover:bg-white whitespace-nowrap text-sm shrink-0">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.title}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                      {item.children.map((child) =>
                        child.children ? (
                          <DropdownMenuSub key={child.title}>
                            <DropdownMenuSubTrigger className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100">
                              {child.title}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="w-56">
                              {child.children.map((subChild) => (
                                <DropdownMenuItem key={subChild.title} asChild>
                                  <Link
                                    href={subChild.url}
                                    className="block px-2 py-1 rounded-md hover:bg-gray-100 text-[var(--primary-text)]"
                                  >
                                    {subChild.title}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        ) : (
                          <DropdownMenuItem key={child.title} asChild>
                            <Link
                              href={child.url || "#"}
                              className="block px-2 py-1 rounded-md hover:bg-gray-100 text-[var(--primary-text)]"
                            >
                              {child.title}
                            </Link>
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="flex items-center gap-2 p-2 shadow-sm border font-medium text-[var(--primary-text)] bg-white/20 hover:bg-white whitespace-nowrap text-sm shrink-0"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.title}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Hamburger - Visible on smaller screens */}
            <DropdownMenu>
              <DropdownMenuTrigger className="2xl:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-white shadow hover:bg-gray-100 transition-colors ml-auto shrink-0">
                <IconMenu2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                {navItems.map((item) =>
                  item.children ? (
                    <DropdownMenuGroup key={item.title}>
                      <DropdownMenuItem className="font-semibold">
                        {item.title}
                      </DropdownMenuItem>
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.title} asChild>
                          <Link href={child.url || "#"}>{child.title}</Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                  ) : (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.url} className="flex gap-2 items-center">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown - Always visible */}
            <div className="flex items-center gap-2 ml-auto 2xl:ml-2 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow hover:bg-gray-100 transition-colors">
                  <IconUser className="w-4 h-4 sm:w-5 sm:h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}