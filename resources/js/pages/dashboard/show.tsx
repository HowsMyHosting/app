import AuthenticatedLayout from "@/layouts/authenticated-layout";
import CloudwaysAppsTable from "@/pages/dashboard/partials/cloudways-apps-table";
import InitialSetupFlow from "@/pages/dashboard/partials/initial-setup-flow";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({ auth, cloudwaysApps }: PageProps & { cloudwaysApps: LocalCloudwaysApp[] }) => {
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
