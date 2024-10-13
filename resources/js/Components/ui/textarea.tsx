import * as React from "react";

import { cn } from "@/lib/utils";
import InputLabel from "@/components/input-label";
import { FormContext } from "@/hooks/form-context";
import InputError from "@/components/input-error";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, errorMessage, ...props }, ref) => {
        const { isLoading: formIsLoading } = React.useContext(FormContext);

        if (formIsLoading) {
            props.disabled = true;
        }

        return (
            <>
                {label ? (
                    <InputLabel
                        htmlFor={props.id}
                        value={label}
                        className="mb-[6px]"
                    />
                ) : null}

                <textarea
                    className={cn(
                        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />

                <InputError message={errorMessage} className="mt-[6px]" />
            </>
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
