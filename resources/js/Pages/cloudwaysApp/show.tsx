import Stepper from "@/components/custom/stepper";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/cloudwaysApp/partials/choose-reporting-data";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

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
                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <>
                        <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                            <Stepper steps={steps} />
                        </div>

                        <ChooseReportingData />
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
