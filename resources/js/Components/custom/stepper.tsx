import { Steps } from "@/types/stepper";
import { CheckCircleIcon } from "lucide-react";

const Stepper = ({ steps }: { steps: Steps }) => {
    return (
        <ul className="relative flex flex-row gap-x-5">
            {steps.map((step, index) => (
                <li className="shrink basis-0 flex-1 group" key={index}>
                    <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                        {step.passed ? (
                            <span className="size-7 flex justify-center items-center shrink-0 bg-primary font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                                <CheckCircleIcon size={16} />
                            </span>
                        ) : (
                            <>
                                {step.current ? (
                                    <span className="size-7 flex justify-center items-center shrink-0 bg-accent border font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                                        {index + 1}
                                    </span>
                                ) : (
                                    <span className="size-7 flex justify-center items-center shrink-0 bg-white border font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                                        {index + 1}
                                    </span>
                                )}
                            </>
                        )}
                        <div className="ms-2 w-full h-px flex-1 bg-slate-200 group-last:hidden dark:bg-neutral-700"></div>
                    </div>
                    <div className="mt-3">
                        <span className="block text-xs text-gray-600 dark:text-white">
                            {step.label}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Stepper;
