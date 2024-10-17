import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/choose-reporting-data/partials/choose-reporting-data";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const ShowBulk = ({ auth, cloudwaysApps }: PageProps & { cloudwaysApps: LocalCloudwaysApp[] }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Choose Reporting Data" />

            <div className="container pb-16">
                <ChooseReportingData cloudwaysApps={cloudwaysApps} showStepper={!auth.user.finished_initial_setup} />
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowBulk;
