import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

type DrawerDialogProps = {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    trigger?: React.ReactNode;
    body: React.ReactNode;
    openDialog?: boolean;
    setOpenDialog?: (open: boolean) => void;
};

export function DrawerDialog({
    title,
    description,
    trigger,
    body,
    openDialog,
    setOpenDialog,
}: DrawerDialogProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={openDialog ?? open}
                onOpenChange={setOpenDialog ?? setOpen}
            >
                {trigger ? (
                    <DialogTrigger asChild>{trigger}</DialogTrigger>
                ) : null}

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="mb-3">
                        <DialogTitle className="mb-3">{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {body}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={openDialog ?? open}
            onOpenChange={setOpenDialog ?? setOpen}
        >
            {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}

            <DrawerContent>
                <DrawerHeader className="text-left mb-3">
                    <DrawerTitle className="mb-3">{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="px-[16px]">{body}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
