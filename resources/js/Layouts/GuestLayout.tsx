import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen container flex flex-col justify-center items-center pt-6 sm:pt-0 relative">
            <div className="absolute top-[20px] left-[33px]">
                <Link href={route("welcome")}>
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-[-100px] sm:mt-[40px]">
                {children}
            </div>
        </div>
    );
}
