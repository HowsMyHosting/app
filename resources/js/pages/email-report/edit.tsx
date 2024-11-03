import AuthenticatedLayout from "@/layouts/authenticated-layout";
import EditReportingEmail from "@/pages/email-report/partials/edit-reporting-email";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, cloudwaysApp }: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Email Report" />

            <div className="container pb-16">
                <EditReportingEmail cloudwaysApp={cloudwaysApp} isEdit />
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
