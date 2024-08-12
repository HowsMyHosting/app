import { FormContext } from "@/Hooks/FormContext";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    isLoading: boolean;
}

const Form = ({ isLoading, children, ...props }: FormProps) => {
    return (
        <FormContext.Provider value={{ isLoading }}>
            <form {...props}>{children}</form>
        </FormContext.Provider>
    );
};

export default Form;
