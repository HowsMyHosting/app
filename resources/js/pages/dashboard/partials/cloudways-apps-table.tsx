import { DataTable } from "@/components/custom/tables/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/pages/dashboard/config/columns";
import { TableToolbar } from "@/pages/dashboard/partials/table-toolbar";
import { LocalCloudwaysApp } from "@/types";
import { router, usePage } from "@inertiajs/react";

const CloudwaysAppsTable = () => {
    const { cloudwaysApps } = usePage<{ cloudwaysApps: LocalCloudwaysApp[] }>().props;

    return (
        <div className="mt-10 sm:mt-14">
            {cloudwaysApps.length > 0 ? (
                <>
                    <DataTable columns={columns} data={cloudwaysApps} ToolbarComponent={TableToolbar} />
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
