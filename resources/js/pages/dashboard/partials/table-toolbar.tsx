import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { ChevronDownIcon, Edit3Icon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocalCloudwaysApp } from "@/types";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { useState } from "react";

interface DataTableToolbarProps {
    table: Table<LocalCloudwaysApp>;
}

export const TableToolbar = ({ table }: DataTableToolbarProps) => {
    return (
        <>
            <div className="flex space-y-4 sm:space-y-0 sm:flex-row flex-col justify-between sm:items-center mb-4">
                <h1 className="font-bold text-xl">Your Cloudways Apps</h1>

                <Actions table={table} />
            </div>

            <Search table={table} />
        </>
    );
};

export const Actions = ({ table }: DataTableToolbarProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleDelete = () => {
        setIsLoading(true);

        router.delete(route("cloudways-app.destroy.bulk"), {
            data: {
                cloudwaysApps: table.getFilteredSelectedRowModel().rows.map((row) => row.original.uuid),
            },
            onSuccess: () => {
                setIsLoading(false);
                setOpenDialog(false);
            },
        });
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            variant="secondary"
                            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                        >
                            Bulk actions <ChevronDownIcon size={16} className="ml-1 mt-[2px]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            className="space-x-2"
                            onClick={() =>
                                router.visit(
                                    route("cloudways-app-reporting-data.create.bulk", {
                                        cloudwaysApps: table
                                            .getFilteredSelectedRowModel()
                                            .rows.map((row) => row.original.id)
                                            .join(","),
                                    }),
                                )
                            }
                        >
                            <Edit3Icon color="#9ca3af" size={15} />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="space-x-2 text-red-500" onClick={() => setOpenDialog(true)}>
                            <Trash2Icon size={15} />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" onClick={() => router.visit(route("cloudways-app.create"))}>
                    <PlusIcon size={16} className="mr-1" /> Add new
                </Button>
            </div>

            <DrawerDialog
                title="Are you sure?"
                description={
                    <>
                        <span>
                            You've selected the apps below to delete. This action cannot be undone. Are you sure you
                            want to proceed?
                        </span>

                        <span className="block space-y-[3px] bg-muted p-3.5 rounded-lg mt-4 max-h-[150px] overflow-y-auto">
                            {table
                                .getFilteredSelectedRowModel()
                                .rows.map((row) => row.original)
                                .map((app) => (
                                    <span className="block" key={app.uuid}>
                                        {app.label}
                                    </span>
                                ))}
                        </span>
                    </>
                }
                body={
                    <Button
                        isLoading={isLoading}
                        loadingText="Deleting..."
                        showSpinner
                        onClick={handleDelete}
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
    );
};

export const Search = ({ table }: DataTableToolbarProps) => {
    return (
        <div className="relative">
            <SearchIcon size={15} className="absolute top-[13px] left-[15px] text-gray-400" />

            <Input
                placeholder="Search your apps..."
                value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("label")?.setFilterValue(event.target.value)}
                className="w-full pl-[36px]"
            />
        </div>
    );
};
