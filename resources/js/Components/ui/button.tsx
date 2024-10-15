import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { FormContext } from "@/hooks/form-context";

const buttonVariants = cva(
    "inline-flex font-medium items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px]",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:translate-y-[-2px]",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:translate-y-[-2px]",
                secondary:
                    "bg-white rounded-md border border-input bg-transparent shadow-sm transition-colors hover:translate-y-[-2px]",
                ghost: "hover:bg-accent hover:text-accent-foreground hover:translate-y-[-2px]",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 px-4 text-[14px]",
                lg: "h-12 px-8",
                icon: "h-9 w-9",
            },
            rounded: {
                normal: "rounded-md",
                pill: "rounded-[50px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            rounded: "normal",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    showSpinner?: boolean;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            isLoading = false,
            showSpinner = false,
            loadingText,
            asChild = false,
            ...props
        },
        ref,
    ) => {
        const { isLoading: formIsLoading } = React.useContext(FormContext);
        const Comp = asChild ? Slot : "button";

        if (isLoading || formIsLoading) {
            props.disabled = true;

            if (props.type === "submit" || showSpinner) {
                props.children = (
                    <>
                        <LoaderCircleIcon
                            size={15}
                            className="mr-2 animate-spin"
                        />
                        {loadingText ? loadingText : null}
                    </>
                );
            }
        }

        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, rounded, className }),
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
