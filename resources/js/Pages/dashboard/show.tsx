import AuthenticatedLayout from "@/layouts/authenticated-layout";
import InitialSetupFlow from "@/pages/dashboard/partials/initial-setup-flow";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="container">
                {auth.user.finished_initial_setup ? (
                    <p>yay you're all setup</p>
                ) : (
                    <InitialSetupFlow />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
