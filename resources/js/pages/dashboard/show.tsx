import AuthenticatedLayout from "@/layouts/authenticated-layout";
import CloudwaysAppsTable from "@/pages/dashboard/partials/cloudways-apps-table";
import InitialSetupFlow from "@/pages/dashboard/partials/initial-setup-flow";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="container pb-16">
                {auth.user.finished_initial_setup || auth.user.addedFirstApp ? (
                    <CloudwaysAppsTable />
                ) : (
                    <InitialSetupFlow />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
