import { ColumnDef, Row } from "@tanstack/react-table";

export const columns: ColumnDef<{ sent_at: string; opened_at: string; clicked_at: string }>[] = [
    {
        accessorKey: "sent_at",
        header: "Sent at",
    },
    {
        accessorKey: "opened_at",
        header: "Opened at",
    },
    {
        accessorKey: "clicked_at",
        header: "Clicked at",
    },
];
