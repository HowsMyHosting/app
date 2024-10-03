import Stepper from "@/components/custom/stepper";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";

const Show = ({
    auth,
    cloudwaysApp,
}: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    const steps = [
        {
            label: "Connect to Cloudways",
            passed: true,
            current: false,
        },
        {
            label: "Add an app/website",
            passed: true,
            current: false,
        },
        {
            label: "Choose reporting data",
            passed: false,
            current: true,
        },
        {
            label: "Set up email report",
            passed: false,
            current: false,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

            <div className="container">
                <Link
                    href={route("dashboard")}
                    className="flex underline underline-offset-2 items-center mt-5 text-sm"
                >
                    <MoveLeftIcon size={15} />
                    <span className="ml-2 hover:ml-3 transition-all">
                        Back to dashboard
                    </span>
                </Link>

                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <>
                        <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                            <Stepper steps={steps} />
                        </div>

                        <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                            <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                                Choose reporting data
                            </h1>

                            <p className="mb-7 text-sm">
                                Pick some of the data available below to report
                                on monthly.
                            </p>

                            <em className="text-sm">
                                some stuff will show here...
                            </em>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
