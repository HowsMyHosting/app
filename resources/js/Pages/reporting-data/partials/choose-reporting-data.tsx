import Stepper from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { initialSetupSteps } from "@/lib/utils";
import { LocalCloudwaysApp, PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";

type ChooseReportingDataProps = {
    showStepper?: boolean;
    cloudwaysApp?: LocalCloudwaysApp;
    cloudwaysApps?: LocalCloudwaysApp[];
};

const ChooseReportingData = ({ showStepper = false, cloudwaysApp, cloudwaysApps }: ChooseReportingDataProps) => {
    const { reportingData } = usePage<PageProps & { reportingData: string[] }>().props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedReportingData, setSelectedReportingData] = useState<string[]>([]);
    const isBulk = cloudwaysApps && cloudwaysApps.length > 1;

    const handleStoreReportingData = () => {
        setIsLoading(true);

        const data: {
            reportingData: string[];
            cloudwaysApps?: string[];
        } = {
            reportingData: selectedReportingData,
        };

        if (isBulk) {
            data.cloudwaysApps = cloudwaysApps.map((app) => app.uuid);
        }

        router.post(
            isBulk
                ? route("cloudwaysAppReportingData.store.bulk")
                : route("cloudwaysAppReportingData.store", cloudwaysApp?.uuid),
            data,
        );
    };

    return (
        <>
            {showStepper && (
                <div className="w-full sm:max-w-md mt-[10px] sm:mt-[30px] mx-auto pt-4">
                    <Stepper steps={initialSetupSteps("chooseReportingData")} />
                </div>
            )}

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[30px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">Choose reporting data</h1>

                <p className="mb-7 text-sm">
                    Select relevant data from Cloudways below to include in your monthly report{" "}
                    {isBulk ? "emails" : "email"}
                </p>

                <Button
                    variant="link"
                    className="text-gray-800 p-0 font-normal text-[13px] mb-1"
                    onClick={() => {
                        if (selectedReportingData.length === reportingData.length) {
                            setSelectedReportingData([]);
                        } else {
                            setSelectedReportingData(reportingData);
                        }
                    }}
                >
                    {selectedReportingData.length === reportingData.length ? (
                        <span className="flex items-center gap-x-1">
                            <MinusCircleIcon size={14} /> Deselect all
                        </span>
                    ) : (
                        <span className="flex items-center gap-x-1">
                            <PlusCircleIcon size={14} /> Select all
                        </span>
                    )}
                </Button>

                <div className="space-y-2">
                    {reportingData.map((dataName) => (
                        <label
                            htmlFor={dataName}
                            className={`flex items-center space-x-2 shadow px-4 py-3 border border-muted rounded-lg cursor-pointer hover:translate-y-[-2px] transition-all ${
                                selectedReportingData.includes(dataName) ? "bg-gray-50" : ""
                            }`}
                        >
                            <Checkbox
                                id={dataName}
                                checked={selectedReportingData.includes(dataName)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedReportingData([...selectedReportingData, dataName]);
                                    } else {
                                        setSelectedReportingData(
                                            selectedReportingData.filter((data) => data !== dataName),
                                        );
                                    }
                                }}
                            />
                            <span className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {dataName}
                            </span>
                        </label>
                    ))}
                </div>

                <Button
                    className="mt-6"
                    size="sm"
                    isLoading={isLoading}
                    showSpinner
                    loadingText="One moment..."
                    onClick={handleStoreReportingData}
                    disabled={selectedReportingData.length === 0}
                >
                    Continue
                </Button>
            </div>
        </>
    );
};

export default ChooseReportingData;
