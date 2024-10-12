import Stepper from "@/components/custom/stepper";
import { LocalCloudwaysApp } from "@/types";

const EditReportingEmail = ({
    showStepper = false,
    cloudwaysApp,
}: {
    showStepper?: boolean;
    cloudwaysApp: LocalCloudwaysApp;
}) => {
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
            passed: true,
            current: false,
        },
        {
            label: "Set up email report",
            passed: false,
            current: true,
        },
    ];

    return (
        <>
            {showStepper && (
                <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                    <Stepper steps={steps} />
                </div>
            )}

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                    Set up email report
                </h1>

                <p className="mb-7 text-sm">
                    Select relevant data from Cloudways below to include in your
                    monthly report email. {cloudwaysApp.label}
                </p>
            </div>
        </>
    );
};

export default EditReportingEmail;
