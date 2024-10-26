import { ColumnDef, Row } from "@tanstack/react-table";

import { ColumnHeader } from "@/components/custom/tables/column-header";
import { cn } from "@/lib/utils";
import { LocalCloudwaysApp } from "@/types";
import { Link, router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit3Icon, EllipsisIcon, MailCheckIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<LocalCloudwaysApp>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "label",
        header: ({ column }) => <ColumnHeader column={column} title="App Name" />,
        cell: ({ row }) => (
            <div className="sm:min-w-[250px]">
                <Link
                    className="underline underline-offset-4 decoration-green-400"
                    href={route("cloudways-app.show", row.original.uuid)}
                >
                    {row.getValue("label")}
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "app_id",
        header: ({ column }) => <ColumnHeader className="hidden sm:flex" column={column} title="App ID" />,
        cell: ({ row }) => (
            <div className="hidden sm:block">
                <code className="bg-muted inline-block rounded py-[5px] px-[8px] text-xs">
                    {row.getValue("app_id")}
                </code>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <ColumnHeader className="justify-center hidden sm:flex" column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <div className="text-center hidden sm:block">
                <span
                    className={cn("inline-block h-2 w-2 rounded-full", {
                        "bg-green-400": row.getValue("status") === "connected",
                        "bg-yellow-400": row.getValue("status") === "pending",
                        "bg-red-500": row.getValue("status") === "disconnected",
                    })}
                />
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions row={row} />,
    },
];

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export const RowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const cloudwaysApp = row.original as LocalCloudwaysApp;

    const handleDelete = () => {
        setIsLoading(true);

        router.delete(route("cloudways-app.destroy", cloudwaysApp.uuid), {
            onSuccess: () => {
                setIsLoading(false);
                setOpenDialog(false);
            },
        });
    };

    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="link" className="text-black rounded-full hover:bg-muted">
                        <EllipsisIcon size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {cloudwaysApp.has_reporting_data && (
                        <DropdownMenuItem
                            onClick={() => {
                                router.visit(route("cloudways-app.show", cloudwaysApp.uuid));
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
                                router.visit(route("cloudways-app.show", cloudwaysApp.uuid));
                            }}
                            className="space-x-2"
                        >
                            <MailCheckIcon color="#9ca3af" size={15} />
                            <span>Edit email</span>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                        onClick={() => {
                            setOpenDialog(true);
                        }}
                        className="space-x-2 text-red-500"
                    >
                        <Trash2Icon size={15} />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DrawerDialog
                title="Are you sure?"
                description={
                    <span>
                        All reporting emails created for{" "}
                        <span className="underline underline-offset-2">{cloudwaysApp.label}</span> will be permanently
                        deleted. This action cannot be undone. Are you sure you want to proceed?
                    </span>
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
        </div>
    );
};
