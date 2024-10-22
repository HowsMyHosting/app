import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg text-[15px] px-[15px] py-[10px] min-h-[68px] gap-2 inter",
                    content: "gap-[1px]",
                    description:
                        "group-[.toast]:text-muted-foreground text-[13px]",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    icon: "mr-2",
                },
            }}
            icons={{
                success: <CheckCircleIcon size={18} color="#23b960" />,
                error: <XCircleIcon size={18} color="#dc2a48" />,
            }}
            {...props}
        />
    );
};

export { Toaster };
