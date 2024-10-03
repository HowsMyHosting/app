import { useState, PropsWithChildren, ReactNode } from "react";
import ResponsiveNavLink from "@/components/responsive-nav-link";
import { Link, router } from "@inertiajs/react";
import { User } from "@/types";
import BaseLayout from "@/layouts/base-layout";
import ApplicationLogo from "@/components/application-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ChevronDownIcon,
    LogOutIcon,
    ReceiptIcon,
    UserCircle,
    UserCircleIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Authenticated = ({
    user,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <BaseLayout>
            <div className="min-h-screen">
                <nav>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-[75px]">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route("dashboard")}>
                                        <ApplicationLogo />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <a className="flex space-x-2 cursor-pointer items-center text-sm">
                                                <Avatar>
                                                    <AvatarFallback className="uppercase bg-[#1f2526] text-white">
                                                        {user?.email.charAt(0)}
                                                        {user?.email.charAt(1)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <span>{user.email}</span>

                                                <ChevronDownIcon width={16} />
                                            </a>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuItem
                                                className="space-x-2"
                                                onClick={() =>
                                                    router.visit(
                                                        route("profile.edit"),
                                                    )
                                                }
                                            >
                                                <UserCircleIcon
                                                    color="#9ca3af"
                                                    size={15}
                                                />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="space-x-2">
                                                <ReceiptIcon
                                                    color="#9ca3af"
                                                    size={15}
                                                />
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="space-x-2"
                                                onClick={() =>
                                                    router.post("/logout")
                                                }
                                            >
                                                <LogOutIcon
                                                    color="#9ca3af"
                                                    size={15}
                                                />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown
                                ? "block border-b"
                                : "hidden") + " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                >
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>
            </div>
        </BaseLayout>
    );
};

export default Authenticated;
