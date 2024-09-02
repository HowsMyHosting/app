import ApplicationLogo from "@/components/application-logo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import BaseLayout from "@/layouts/base-layout";

const Guest = ({ children }: PropsWithChildren) => {
    return (
        <BaseLayout>
            <div className="min-h-screen container flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative">
                <div className="absolute top-[25px] left-[33px]">
                    <Link href={route("welcome")}>
                        <ApplicationLogo />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md pt-24 sm:pt-0">
                    {children}
                </div>
            </div>
        </BaseLayout>
    );
};

export default Guest;
