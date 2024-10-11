import AddApp from "@/pages/cloudwaysApp/partials/add-app";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

const Create = ({
    auth,
    existingAppIds,
}: PageProps & { existingAppIds: Array<string> }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add a Cloudways App" />

            <div className="container">
                <AddApp existingAppIds={existingAppIds} />
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
