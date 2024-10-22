import * as React from "react";

import { cn } from "@/lib/utils";
import InputLabel from "@/components/input-label";
import InputError from "@/components/input-error";
import { FormContext } from "@/hooks/form-context";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    showPassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, errorMessage, showPassword, ...props }, ref) => {
        const { isLoading: formIsLoading } = React.useContext(FormContext);
        const [inputType, setInputType] = React.useState(type);

        if (formIsLoading) {
            props.disabled = true;
        }

        const handleShowPassword = () => {
            if (type !== "password" && type !== "text") {
                console.error(`Original type has to be "text" if you want to use showPassword`);
            }

            if (inputType === "password") {
                setInputType("text");
            } else if (inputType === "text") {
                setInputType("password");
            }
        };

        return (
            <>
                {label ? <InputLabel htmlFor={props.id} value={label} className="mb-[6px]" /> : null}

                <div className={cn("relative", showPassword ? "show-password" : "")}>
                    <input
                        type={inputType}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            className,
                        )}
                        ref={ref}
                        {...props}
                    />

                    {showPassword && (
                        <div className="absolute top-[12px] right-[15px] cursor-pointer" onClick={handleShowPassword}>
                            {inputType === "password" ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                        </div>
                    )}
                </div>

                <InputError message={errorMessage} className="mt-[6px]" />
            </>
        );
    },
);
Input.displayName = "Input";

export { Input };
