import AuthenticatedLayout from "@/layouts/authenticated-layout";
import ChooseReportingData from "@/pages/reporting-data/partials/choose-reporting-data";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, cloudwaysApp }: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Choose Reporting Data" />

            <div className="container pb-16">
                <ChooseReportingData cloudwaysApp={cloudwaysApp} isEdit />
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
