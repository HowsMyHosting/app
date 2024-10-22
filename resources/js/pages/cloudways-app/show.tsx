import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/reporting-data/partials/choose-reporting-data";
import EditReportingEmail from "@/pages/email-report/partials/edit-reporting-email";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({ auth, cloudwaysApp }: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

            <div className="container pb-16">
                {cloudwaysApp.has_email_report ? (
                    // if app has email report, then setup for this app is complete
                    <p>Here we'll show data for the app</p>
                ) : (
                    // if setup is not complete, then we show the setup steps
                    <>
                        {!cloudwaysApp.has_reporting_data ? (
                            // first step of setup is to choose the reporting data
                            <>
                                <ChooseReportingData
                                    cloudwaysApp={cloudwaysApp}
                                    showStepper={!auth.user.finished_initial_setup}
                                />
                            </>
                        ) : (
                            // second step of setup is to edit the reporting email
                            <>
                                <EditReportingEmail
                                    cloudwaysApp={cloudwaysApp}
                                    showStepper={!auth.user.finished_initial_setup}
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
