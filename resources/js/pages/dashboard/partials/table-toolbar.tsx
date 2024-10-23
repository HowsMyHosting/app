import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function TableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    return (
        <div className="relative">
            <SearchIcon size={15} className="absolute top-[13px] left-[15px] text-gray-400" />

            <Input
                placeholder="Search your apps..."
                value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("label")?.setFilterValue(event.target.value)}
                className="w-full pl-[36px]"
            />
        </div>
    );
}
