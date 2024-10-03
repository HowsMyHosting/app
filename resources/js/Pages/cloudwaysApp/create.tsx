import AddApp from "@/pages/cloudwaysApp/partials/add-app";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import { PageProps } from "@/types";

const Create = ({
    auth,
    existingAppIds,
}: PageProps & { existingAppIds: Array<string> }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add a Cloudways App" />

            <div className="container">
                <Link
                    href={route("dashboard")}
                    className="flex underline underline-offset-2 items-center mt-5 text-sm"
                >
                    <MoveLeftIcon size={15} />
                    <span className="ml-2 hover:ml-3 transition-all">
                        Back to dashboard
                    </span>
                </Link>

                <AddApp existingAppIds={existingAppIds} />
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
