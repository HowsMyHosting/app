import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LocalCloudwaysApp } from "@/types";
import { Link, router } from "@inertiajs/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Edit3Icon, EllipsisIcon, MailCheckIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

const CloudwaysAppsTable = ({ cloudwaysApps }: { cloudwaysApps: LocalCloudwaysApp[] }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedApp, setSelectedApp] = useState<LocalCloudwaysApp>();

    const handleDeleteCloudwaysApp = () => {
        setIsLoading(true);

        router.delete(route("cloudwaysApp.destroy", selectedApp?.uuid), {
            onSuccess: () => {
                setIsLoading(false);
                setOpenDialog(false);
            },
        });
    };

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

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>App</TableHead>
                                <TableHead className="hidden sm:block">App ID</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cloudwaysApps.map((cloudwaysApp: LocalCloudwaysApp) => {
                                return (
                                    <TableRow key={cloudwaysApp.uuid}>
                                        <TableCell>
                                            <Link
                                                href={route("cloudwaysApp.show", cloudwaysApp.uuid)}
                                                className="underline underline-offset-2"
                                            >
                                                {cloudwaysApp.label}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="hidden sm:block">
                                            <code className="bg-gray-200 inline-block rounded py-[5px] px-[8px] text-xs">
                                                {cloudwaysApp.app_id}
                                            </code>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {cloudwaysApp.status === "connected" && (
                                                <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                                            )}

                                            {cloudwaysApp.status === "pending" && (
                                                <span className="inline-block h-2 w-2 rounded-full bg-yellow-400"></span>
                                            )}

                                            {cloudwaysApp.status === "disconnected" && (
                                                <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="link"
                                                        className="text-black rounded-full hover:bg-muted"
                                                    >
                                                        <EllipsisIcon size={20} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {cloudwaysApp.has_reporting_data && (
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                router.visit(
                                                                    route("cloudwaysApp.show", cloudwaysApp.uuid),
                                                                );
                                                            }}
                                                            className="space-x-2"
                                                        >
                                                            <Edit3Icon color="#9ca3af" size={15} />
                                                            <span>Edit reporting data</span>
                                                        </DropdownMenuItem>
                                                    )}
                                                    {cloudwaysApp.has_email_report && (
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                router.visit(
                                                                    route("cloudwaysApp.show", cloudwaysApp.uuid),
                                                                );
                                                            }}
                                                            className="space-x-2"
                                                        >
                                                            <MailCheckIcon color="#9ca3af" size={15} />
                                                            <span>Edit email</span>
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedApp(cloudwaysApp);
                                                            setOpenDialog(true);
                                                        }}
                                                        className="space-x-2 text-red-500"
                                                    >
                                                        <Trash2Icon size={15} />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <DrawerDialog
                        title="Are you sure?"
                        description={
                            <span>
                                All reporting emails created for{" "}
                                <span className="underline underline-offset-2">{selectedApp?.label}</span> will be
                                permanently deleted. This action cannot be undone. Are you sure you want to proceed?
                            </span>
                        }
                        body={
                            <Button
                                isLoading={isLoading}
                                loadingText="Deleting..."
                                showSpinner
                                onClick={handleDeleteCloudwaysApp}
                                className="w-full"
                                variant="destructive"
                            >
                                Continue
                            </Button>
                        }
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                    />
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
