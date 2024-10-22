import { initialSetupSteps } from "@/lib/utils";
import AddFirstApp from "@/pages/dashboard/partials/initial-setup-flow/add-first-app";
import ConnectCloudways from "@/pages/dashboard/partials/initial-setup-flow/connect-cloudways";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const InitialSetupFlow = () => {
    const { auth, existingAppIds } = usePage<
        PageProps & { existingAppIds: Array<string> }
    >().props;

    if (!auth.user.hasCloudwaysIntegration) {
        return (
            <ConnectCloudways steps={initialSetupSteps("connectToCloudways")} />
        );
    }

    if (!auth.user.addedFirstApp) {
        return (
            <AddFirstApp
                steps={initialSetupSteps("addYourApps")}
                existingAppIds={existingAppIds}
            />
        );
    }
};

export default InitialSetupFlow;
