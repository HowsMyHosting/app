import { LabelHTMLAttributes } from "react";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={`block font-medium text-[14px] sm:text-sm ` + className}
        >
            {value ? value : children}
        </label>
    );
}
