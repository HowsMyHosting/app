import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/cloudwaysApp/partials/choose-reporting-data";
import EditReportingEmail from "@/pages/cloudwaysApp/partials/edit-reporting-email";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({
    auth,
    cloudwaysApp,
}: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

            <div className="container pb-16">
                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <>
                        {/*
                            TODO: change this so that the setup step is on the cloudways app
                            so that it doesnt just do it on the initial setup.
                        */}
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
