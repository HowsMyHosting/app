import Stepper from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Show = ({
    auth,
    cloudwaysApp,
}: PageProps & { cloudwaysApp: LocalCloudwaysApp }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reportingData, setReportingData] = useState<string[]>([]);

    const steps = [
        {
            label: "Connect to Cloudways",
            passed: true,
            current: false,
        },
        {
            label: "Add an app/website",
            passed: true,
            current: false,
        },
        {
            label: "Choose reporting data",
            passed: false,
            current: true,
        },
        {
            label: "Set up email report",
            passed: false,
            current: false,
        },
    ];

    useEffect(() => {
        console.log(reportingData);
    }, [reportingData]);

    const handleStoreReportingData = () => {
        setIsLoading(true);

        // TODO: create store reporting data route
        // TODO: store the reporting data
        // TODO: redirect to the next step

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={cloudwaysApp.label} />

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

                {auth.user.finished_initial_setup ? (
                    <p>Here we'll show data for the app</p>
                ) : (
                    <>
                        <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                            <Stepper steps={steps} />
                        </div>

                        <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                            <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                                Choose reporting data
                            </h1>

                            <p className="mb-7 text-sm">
                                Pick some of the data below from Cloudways to
                                show on your monthly report email
                            </p>

                            <div className="space-y-2">
                                <label
                                    htmlFor="vulnerabilityScans"
                                    className="flex items-center space-x-2 shadow px-4 py-3 border border-muted rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all hover:bg-gray-50"
                                >
                                    <Checkbox
                                        id="vulnerabilityScans"
                                        checked={reportingData.includes(
                                            "vulnerabilityScans",
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setReportingData([
                                                    ...reportingData,
                                                    "vulnerabilityScans",
                                                ]);
                                            } else {
                                                setReportingData(
                                                    reportingData.filter(
                                                        (data) =>
                                                            data !==
                                                            "vulnerabilityScans",
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Vulnerability scans
                                    </span>
                                </label>

                                <label
                                    htmlFor="botProtection"
                                    className="flex items-center space-x-2 shadow px-4 py-3 border border-muted rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all hover:bg-gray-50"
                                >
                                    <Checkbox
                                        id="botProtection"
                                        checked={reportingData.includes(
                                            "botProtection",
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setReportingData([
                                                    ...reportingData,
                                                    "botProtection",
                                                ]);
                                            } else {
                                                setReportingData(
                                                    reportingData.filter(
                                                        (data) =>
                                                            data !==
                                                            "botProtection",
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Bot protection
                                    </span>
                                </label>

                                <label
                                    htmlFor="malwareProtection"
                                    className="flex items-center space-x-2 shadow px-4 py-3 border border-muted rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all hover:bg-gray-50"
                                >
                                    <Checkbox
                                        id="malwareProtection"
                                        checked={reportingData.includes(
                                            "malwareProtection",
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setReportingData([
                                                    ...reportingData,
                                                    "malwareProtection",
                                                ]);
                                            } else {
                                                setReportingData(
                                                    reportingData.filter(
                                                        (data) =>
                                                            data !==
                                                            "malwareProtection",
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Malware protection
                                    </span>
                                </label>

                                <label
                                    htmlFor="backupStatus"
                                    className="flex items-center space-x-2 shadow px-4 py-3 border border-muted rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all hover:bg-gray-50"
                                >
                                    <Checkbox
                                        id="backupStatus"
                                        checked={reportingData.includes(
                                            "backupStatus",
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setReportingData([
                                                    ...reportingData,
                                                    "backupStatus",
                                                ]);
                                            } else {
                                                setReportingData(
                                                    reportingData.filter(
                                                        (data) =>
                                                            data !==
                                                            "backupStatus",
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Backup status
                                    </span>
                                </label>
                            </div>

                            <Button
                                className="mt-6"
                                isLoading={isLoading}
                                showSpinner
                                loadingText="One moment..."
                                onClick={handleStoreReportingData}
                                disabled={reportingData.length === 0}
                            >
                                Continue
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
