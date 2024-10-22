import AuthenticatedLayout from "@/layouts/authenticated-layout";
import EditReportingEmail from "@/pages/email-report/partials/edit-reporting-email";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const ShowBulk = ({ auth, cloudwaysApps }: PageProps & { cloudwaysApps: LocalCloudwaysApp[] }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Email Report" />

            <div className="container pb-16">
                <EditReportingEmail cloudwaysApps={cloudwaysApps} showStepper={!auth.user.finished_initial_setup} />
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowBulk;
