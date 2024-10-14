import Stepper from "@/components/custom/stepper";
import AddApp from "@/pages/cloudways-app/partials/add-app";
import { Steps } from "@/types/stepper";

const AddFirstApp = ({
    steps,
    existingAppIds,
}: {
    steps: Steps;
    existingAppIds: Array<string>;
}) => {
    return (
        <>
            <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                <Stepper steps={steps} />
            </div>

            <AddApp existingAppIds={existingAppIds} />
        </>
    );
};

export default AddFirstApp;
