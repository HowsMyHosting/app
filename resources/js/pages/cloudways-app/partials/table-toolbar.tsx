import { ChevronDownIcon, Edit3Icon, MailCheckIcon, SendIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const TableToolbar = () => {
    return (
        <>
            <div className="flex space-y-4 sm:space-y-0 sm:flex-row flex-col justify-between sm:items-center">
                <h1 className="font-bold text-xl">Email report history</h1>

                <Actions />
            </div>
        </>
    );
};

export const Actions = () => {
    const { cloudwaysApp, auth } = usePage<PageProps & { cloudwaysApp: LocalCloudwaysApp }>().props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openTestEmailDialog, setOpenTestEmailDialog] = useState<boolean>(false);
    const [testEmailAddress, setTestEmailAddress] = useState<string>(auth.user.email);

    const handleDelete = () => {
        setIsLoading(true);

        router.delete(route("cloudways-app.destroy", cloudwaysApp.uuid));
    };

    const handleSendTestEmail = () => {
        // ...
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary">
                            Actions <ChevronDownIcon size={16} className="ml-1 mt-[2px]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="space-x-2" onClick={() => setOpenTestEmailDialog(true)}>
                            <SendIcon color="#9ca3af" size={15} />
                            <span>Send test email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="space-x-2">
                            <Edit3Icon color="#9ca3af" size={15} />
                            <span>Edit reporting data</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="space-x-2">
                            <MailCheckIcon color="#9ca3af" size={15} />
                            <span>Edit email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="space-x-2 text-red-500" onClick={() => setOpenDeleteDialog(true)}>
                            <Trash2Icon size={15} />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <DrawerDialog
                title="Are you sure?"
                description={
                    <span>
                        You've chosen to stop reporting on {cloudwaysApp.label} and remove it from this account. This
                        action cannot be undone. Are you sure you want to proceed?
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
                openDialog={openDeleteDialog}
                setOpenDialog={setOpenDeleteDialog}
            />

            <DrawerDialog
                title="Send a test email"
                description={
                    <div className="space-y-4">
                        <span>
                            Send a test email to the address below to see an example of what the recipients will
                            receive.
                        </span>
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={testEmailAddress}
                            onChange={(e) => setTestEmailAddress(e.target.value)}
                            autoFocus
                        />
                    </div>
                }
                body={
                    <Button
                        isLoading={isLoading}
                        loadingText="Sending..."
                        showSpinner
                        onClick={handleSendTestEmail}
                        className="w-full"
                    >
                        Send
                    </Button>
                }
                openDialog={openTestEmailDialog}
                setOpenDialog={setOpenTestEmailDialog}
            />
        </>
    );
};
