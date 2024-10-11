import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ChooseReportingData = () => {
    const { reportingData } = usePage<PageProps & { reportingData: string[] }>()
        .props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedReportingData, setSelectedReportingData] = useState<
        string[]
    >([]);

    const handleStoreReportingData = () => {
        setIsLoading(true);

        // TODO: create store reporting data route
        // TODO: store the reporting data
        //

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        console.log(selectedReportingData);
    }, [selectedReportingData]);

    return (
        <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
            <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                Choose reporting data
            </h1>

            <p className="mb-7 text-sm">
                Pick some of the data below from Cloudways to show on your
                monthly report email
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
                            selectedReportingData.includes(dataName)
                                ? "bg-gray-50"
                                : ""
                        }`}
                    >
                        <Checkbox
                            id={dataName}
                            checked={selectedReportingData.includes(dataName)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setSelectedReportingData([
                                        ...selectedReportingData,
                                        dataName,
                                    ]);
                                } else {
                                    setSelectedReportingData(
                                        selectedReportingData.filter(
                                            (data) => data !== dataName,
                                        ),
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
                isLoading={isLoading}
                showSpinner
                loadingText="One moment..."
                onClick={handleStoreReportingData}
                disabled={reportingData.length === 0}
            >
                Continue
            </Button>
        </div>
    );
};

export default ChooseReportingData;
