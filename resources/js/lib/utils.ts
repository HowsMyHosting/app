import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const initialSetupSteps = (currentStep: string) => {
    const steps = [
        {
            value: "connectToCloudways",
            label: "Connect to Cloudways",
            passed: false,
            current: false,
        },
        {
            value: "addYourApps",
            label: "Add your apps/websites",
            passed: false,
            current: false,
        },
        {
            value: "chooseReportingData",
            label: "Choose reporting data",
            passed: false,
            current: false,
        },
        {
            value: "setupEmailReport",
            label: "Set up email report",
            passed: false,
            current: false,
        },
    ];

    const currentIndex = steps.findIndex((step) => step.value === currentStep);

    return steps.map((step, index) => {
        if (index < currentIndex) {
            return { ...step, passed: true };
        }

        if (index === currentIndex) {
            return { ...step, current: true };
        }

        return step;
    });
};
