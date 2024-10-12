import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/cloudwaysApp/partials/choose-reporting-data";
import EditReportingEmail from "@/pages/cloudwaysApp/partials/edit-reporting-email";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

const Show = ({
    auth,
    cloudwaysApp,
}: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

            <div className="container">
                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <>
                        {auth.user.initial_setup_step === 3 ? (
                            <>
                                <ChooseReportingData
                                    cloudwaysApp={cloudwaysApp}
                                    showStepper
                                />
                            </>
                        ) : (
                            <>
                                <EditReportingEmail
                                    cloudwaysApp={cloudwaysApp}
                                    showStepper
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
