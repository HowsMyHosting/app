import Form from "@/components/custom/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const ResetPasswordForm = ({
    token,
    email,
}: {
    token: string;
    email: string;
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Form onSubmit={submit} isLoading={processing}>
            <div>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    label="Email Address"
                    errorMessage={errors.email}
                    autoComplete="username"
                    autoFocus
                    readOnly
                    disabled
                    onChange={(e) => setData("email", e.target.value)}
                />
            </div>

            <div className="mt-4">
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    label="Password"
                    errorMessage={errors.password}
                    autoComplete="new-password"
                    showPassword
                    onChange={(e) => setData("password", e.target.value)}
                />
            </div>

            <div className="mt-4">
                <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    label="Confirm Password"
                    errorMessage={errors.password_confirmation}
                    autoComplete="new-password"
                    showPassword
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
            </div>

            <div className="mt-6">
                <Button className="w-full" type="submit">
                    Reset your password
                </Button>
            </div>
        </Form>
    );
};

export default ResetPasswordForm;
