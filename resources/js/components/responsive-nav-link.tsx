import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full text-sm flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? "border-gray-500 text-gray-700 bg-accent focus:text-gray-800 focus:bg-accent focus:border-gray-700"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
