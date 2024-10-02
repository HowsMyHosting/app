// @ts-nocheck
// the nocheck is in place because of the type property on
// the toast helper from sonner

import { Link, router } from "@inertiajs/react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import Stepper from "@/components/custom/stepper";
import { Steps } from "@/types/stepper";
import { useEffect, useState } from "react";
import { LoaderCircleIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { DrawerDialog } from "@/components/custom/drawer-dialog";

type App = {
    label: string;
    id: string;
};

type Server = {
    label: string;
    apps: App[];
};

const AddFirstApp = ({
    steps,
    existingAppIds,
}: {
    steps: Steps;
    existingAppIds: Array<string>;
}) => {
    const [serversLoading, setServersLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [servers, setServers] = useState<Server[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedApp, setSelectedApp] = useState<App>();

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
            .get(route("cloudwaysIntegration.refreshServersList"))
            .then(({ data }) => {
                setServers(data.cloudwaysServers as Server[]);

                setServersLoading(false);
            })
            .catch(({ response }) => {
                toast(response.data.message, {
                    description: response.data.description,
                    type: "error",
                });

                setServersLoading(false);
            });
    };

    const handleStoreApp = () => {
        setIsLoading(true);

        router.post(route("cloudwaysApp.store"), {
            label: selectedApp?.label,
            id: selectedApp?.id,
        });
    };

    return (
        <>
            <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                <Stepper steps={steps} />
            </div>

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                    Add an app<span className="mx-1">/</span>website
                </h1>

                <p className="mb-7 text-sm">
                    Pick one of your apps from the list below.
                </p>

                {serversLoading ? (
                    <div className="flex space-x-1.5 items-center">
                        <LoaderCircleIcon size={15} className="animate-spin" />
                        <p className="text-sm">Loading your servers...</p>
                    </div>
                ) : (
                    <>
                        <Command
                            loop={true}
                            defaultValue=""
                            className="rounded-lg border shadow-md md:min-w-[450px]"
                        >
                            <CommandInput
                                autoFocus
                                placeholder="Type an app name or search..."
                            />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>

                                {servers.map((server: Server, index) => (
                                    <div key={index}>
                                        {index > 0 && <CommandSeparator />}

                                        <CommandGroup heading={server.label}>
                                            {server.apps.map((app, index) => (
                                                <CommandItem
                                                    disabled={existingAppIds.includes(
                                                        app.id,
                                                    )}
                                                    value={app.id}
                                                    keywords={[app.label]}
                                                    key={index}
                                                    onSelect={() => {
                                                        setSelectedApp(app);
                                                        setOpenDialog(true);
                                                    }}
                                                >
                                                    <span>{app.label}</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </div>
                                ))}
                            </CommandList>
                        </Command>

                        <Button
                            rounded="pill"
                            variant="secondary"
                            size="sm"
                            className="mt-4 px-4"
                            onClick={refreshCloudwaysServers}
                        >
                            <RotateCcwIcon size={13} className="mr-1" /> Refresh
                            list
                        </Button>

                        <DrawerDialog
                            title="Confirm your selection"
                            description={
                                <span>
                                    You've selected to report on{" "}
                                    <span className="underline underline-offset-2">
                                        {selectedApp?.label}
                                    </span>{" "}
                                    for an additional $2/month. Do you want to
                                    proceed?
                                </span>
                            }
                            body={
                                <Button
                                    isLoading={isLoading}
                                    loadingText="Creating..."
                                    showSpinner
                                    onClick={handleStoreApp}
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
                    Each app/website you add will be an additional $2/mo charge
                    on your account as outlined in our{" "}
                    <Link href="" className="underline">
                        pricing page
                    </Link>
                    .
                </p>
            </div>
        </>
    );
};

export default AddFirstApp;
