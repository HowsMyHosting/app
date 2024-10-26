import { DrawerDialog } from "@/components/custom/drawer-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { LoaderCircleIcon, MinusCircleIcon, PlusCircleIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type App = {
    label: string;
    id: string;
};

type Server = {
    label: string;
    apps: App[];
};

const AddApp = ({ existingAppIds }: { existingAppIds: Array<string> }) => {
    const [serversLoading, setServersLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [servers, setServers] = useState<Server[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedApps, setSelectedApps] = useState<App[]>([]);

    useEffect(() => {
        setTimeout(() => {
            getCloudwaysServers();
        }, 0);
    }, []);

    const getCloudwaysServers = () => {
        router.reload({
            only: ["cloudwaysServers"],
            onSuccess: (page) => {
                setServers(page.props.cloudwaysServers as Server[]);
                setServersLoading(false);
            },
        });
    };

    const refreshCloudwaysServers = () => {
        setServersLoading(true);

        axios
            .get(route("cloudways-integration.refresh-servers-list"))
            .then(({ data }) => {
                setServers(data.cloudwaysServers as Server[]);

                setServersLoading(false);
            })
            .catch(({ response }) => {
                toast.error(response.data.message, {
                    description: response.data.description,
                });

                setServersLoading(false);
            });
    };

    const handleStoreApps = () => {
        setIsLoading(true);

        router.post(route("cloudways-app.store.bulk"), {
            apps: selectedApps,
        });
    };

    const getAllApps = () => {
        return servers.flatMap((server) => server.apps.filter((app) => !existingAppIds.includes(app.id)));
    };

    const handleSelectAll = () => {
        const allApps = getAllApps();
        if (selectedApps.length === allApps.length) {
            setSelectedApps([]);
        } else {
            setSelectedApps(allApps);
        }
    };

    return (
        <div className="w-full sm:max-w-md mt-[10px] sm:mt-[30px] mx-auto pt-4">
            <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                Add your apps<span className="mx-1">/</span>websites
            </h1>

            <p className="mb-4 text-sm">Pick your apps from the list below.</p>

            {serversLoading ? (
                <div className="flex space-x-1.5 items-center">
                    <LoaderCircleIcon size={15} className="animate-spin" />
                    <p className="text-sm">Loading your servers...</p>
                </div>
            ) : (
                <>
                    <Button
                        variant="link"
                        className="text-gray-800 p-0 font-normal text-[13px] mb-1"
                        onClick={handleSelectAll}
                    >
                        {selectedApps.length === getAllApps().length ? (
                            <span className="flex items-center gap-x-1">
                                <MinusCircleIcon size={14} /> Deselect all
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-1">
                                <PlusCircleIcon size={14} /> Select all
                            </span>
                        )}
                    </Button>

                    <Command loop={true} defaultValue="" className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput autoFocus placeholder="Type an app name or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>

                            {servers.map((server: Server, index) => (
                                <div key={index}>
                                    {index > 0 && <CommandSeparator />}

                                    <CommandGroup heading={server.label}>
                                        {server.apps.map((app, index) => (
                                            <CommandItem
                                                disabled={existingAppIds.includes(app.id)}
                                                value={app.id}
                                                keywords={[app.label]}
                                                key={index}
                                                onSelect={() => {
                                                    setSelectedApps(
                                                        selectedApps.includes(app)
                                                            ? selectedApps.filter((a) => a.id !== app.id)
                                                            : [...selectedApps, app],
                                                    );
                                                }}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        checked={selectedApps.some(
                                                            (selectedApp) => selectedApp.id === app.id,
                                                        )}
                                                    />
                                                    <span>{app.label}</span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </div>
                            ))}
                        </CommandList>
                    </Command>

                    <div className="flex space-x-2 mt-5">
                        <Button size="sm" onClick={() => setOpenDialog(true)} disabled={selectedApps.length === 0}>
                            Continue
                        </Button>

                        <Button size="sm" variant="secondary" onClick={refreshCloudwaysServers}>
                            <RotateCcwIcon size={14} className="mr-[5px]" />
                            Refresh list
                        </Button>
                    </div>

                    <DrawerDialog
                        title="Confirm your selection"
                        description={
                            <>
                                <span>
                                    You've selected the apps below to report on for $2/month each. Ready to continue?
                                </span>

                                <span className="block space-y-[3px] bg-muted p-3.5 rounded-lg mt-4 max-h-[150px] overflow-y-auto">
                                    {selectedApps.map((app) => (
                                        <span className="block" key={app.id}>
                                            {app.label}
                                        </span>
                                    ))}
                                </span>
                            </>
                        }
                        body={
                            <Button
                                isLoading={isLoading}
                                loadingText="Continuing..."
                                showSpinner
                                onClick={handleStoreApps}
                                className="w-full"
                            >
                                Continue
                            </Button>
                        }
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                    />
                </>
            )}

            <p className="text-[14px] text-gray-400 mt-8">
                Each app/website you add will be an additional $2/mo charge on your account as outlined in our{" "}
                <Link href="" className="underline">
                    pricing page
                </Link>
                .
            </p>
        </div>
    );
};

export default AddApp;
