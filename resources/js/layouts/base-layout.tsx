import { Toaster } from "@/components/ui/sonner";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

const BaseLayout = ({ children }: PropsWithChildren) => {
    const { session } = usePage<PageProps>().props;
    const history = JSON.parse(sessionStorage.getItem("historyURLs") || "[]");

    if (history.length >= 5) {
        history.shift();
    }

    history.push(window.location.href);
    sessionStorage.setItem("historyURLs", JSON.stringify(history));

    useEffect(() => {
        const toastIds = JSON.parse(sessionStorage.getItem("history") || "[]");

        /**
         * Update the session storage so that previous
         * toasts don't show up when navigating the
         * browser history.
         */
        const updateToastIds = (toastId: string) => {
            toastIds.push(toastId);
            sessionStorage.setItem("toastIds", JSON.stringify(toastIds));
        };

        if (session.toast.message && !toastIds.includes(session.toast.id)) {
            toast[session.toast.type](session.toast.message, {
                description: session.toast.description,
            });

            updateToastIds(session.toast.id);
        }
    }, [session.toast]);

    return (
        <>
            <Toaster />

            {children}
        </>
    );
};

export default BaseLayout;
