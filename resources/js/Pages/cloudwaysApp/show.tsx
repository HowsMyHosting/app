import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Show = ({
    auth,
    cloudwaysApp,
}: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

            <div className="container">
                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <p>Here we'll continue the flow to create the app</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
