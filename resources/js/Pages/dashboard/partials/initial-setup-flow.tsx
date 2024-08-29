import AddFirstApp from "@/pages/dashboard/partials/initial-setup-flow/add-first-app";
import ConnectCloudways from "@/pages/dashboard/partials/initial-setup-flow/connect-cloudways";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const InitialSetupFlow = () => {
    const { auth } = usePage<PageProps>().props;

    const steps = [
        {
            label: "Connect to Cloudways",
            passed: false,
            current: false,
        },
        {
            label: "Add an app/website",
            passed: false,
            current: false,
        },
        {
            label: "Choose reporting data",
            passed: false,
            current: false,
        },
        {
            label: "Set up email report",
            passed: false,
            current: false,
        },
    ];

    if (!auth.user.hasCloudwaysIntegration) {
        steps[0].current = true;

        return <ConnectCloudways steps={steps} />;
    }

    if (!auth.user.addedFirstApp) {
        steps[0].passed = true;
        steps[1].current = true;

        return <AddFirstApp steps={steps} />;
    }
};

export default InitialSetupFlow;
