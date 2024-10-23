import { DataTable } from "@/components/custom/tables/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/pages/dashboard/config/columns";
import { LocalCloudwaysApp } from "@/types";
import { router } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

const CloudwaysAppsTable = ({ cloudwaysApps }: { cloudwaysApps: LocalCloudwaysApp[] }) => {
    return (
        <div className="mt-10 sm:mt-14">
            {cloudwaysApps.length > 0 ? (
                <>
                    <div className="flex space-y-4 sm:space-y-0 sm:flex-row flex-col justify-between sm:items-center mb-5 sm:mb-6">
                        <h1 className="font-bold text-xl">Your Cloudways Apps</h1>

                        <Button size="sm" onClick={() => router.visit(route("cloudwaysApp.create"))}>
                            <PlusIcon size={16} className="mr-1" /> Add new
                        </Button>
                    </div>

                    <DataTable columns={columns} data={cloudwaysApps} />
                </>
            ) : (
                <div className="text-center max-w-[450px] mx-auto mt-24">
                    <h1 className="font-bold text-xl mb-4">Add a Cloudways App</h1>

                    <p className="mb-6 text-sm">
                        Looks like you don't have any Cloudways apps at the moment. Add one below to start reporting.
                    </p>

                    <Button size="sm" onClick={() => router.visit(route("cloudwaysApp.create"))}>
                        Add your apps
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CloudwaysAppsTable;
