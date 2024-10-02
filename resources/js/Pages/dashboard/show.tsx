import AuthenticatedLayout from "@/layouts/authenticated-layout";
import InitialSetupFlow from "@/pages/dashboard/partials/initial-setup-flow";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CloudwaysAppsTable from "./partials/cloudways-apps-table";

const Show = ({
    auth,
    cloudwaysApps,
}: PageProps & { cloudwaysApps: LocalCloudwaysApp[] }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="container">
                {auth.user.finished_initial_setup || auth.user.addedFirstApp ? (
                    <CloudwaysAppsTable cloudwaysApps={cloudwaysApps} />
                ) : (
                    <InitialSetupFlow />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
