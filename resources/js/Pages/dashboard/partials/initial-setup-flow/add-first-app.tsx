import { Link } from "@inertiajs/react";
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

type App = {
    label: string;
    id: string;
};

type Server = {
    label: string;
    apps: App[];
};

const AddFirstApp = ({ steps }: { steps: Steps }) => {
    const [servers, setServers] = useState<Server[]>([]);

    useEffect(() => {
        setServers([
            {
                label: "Labelle - Sunset Screens",
                apps: [
                    {
                        label: "Labelle Website",
                        id: "app-12345",
                    },
                    {
                        label: "Sunset Screens",
                        id: "app-12346",
                    },
                ],
            },
            {
                label: "EB5 Server - Associates",
                apps: [
                    {
                        label: "EB5 Website",
                        id: "app-123457",
                    },
                    {
                        label: "Associates Tile",
                        id: "app-123458",
                    },
                ],
            },
        ]);
    }, []);

    return (
        <>
            <div className="w-full sm:max-w-md mt-[-100px] sm:mt-[40px] mx-auto pt-12">
                <Stepper steps={steps} />
            </div>

            <div className="w-full sm:max-w-md mt-[-100px] sm:mt-[40px] mx-auto pt-4">
                <h1 className="font-bold text-2xl mb-3">
                    Add an app<span className="mx-1">/</span>website
                </h1>

                <p className="mb-7 text-sm">
                    Pick one of your apps from the list below.
                </p>

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
                                            value={app.label}
                                            key={index}
                                            onSelect={(value: string) =>
                                                alert(
                                                    `You selected ${app.label}`,
                                                )
                                            }
                                        >
                                            <span>{app.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </div>
                        ))}
                    </CommandList>
                </Command>

                <p className="text-sm text-gray-400 mt-8">
                    Each website you add will be an additional $2/mo charge on
                    your account as outlined in our{" "}
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
