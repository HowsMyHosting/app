import Form from "@/components/custom/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router, useForm } from "@inertiajs/react";
import { MoveLeftIcon } from "lucide-react";
import { FormEventHandler } from "react";

const ForgotPasswordForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
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
                    onChange={(e) => setData("email", e.target.value)}
                />
            </div>

            <div className="mt-6">
                <Button className="w-full" type="submit">
                    Email password reset link
                </Button>
            </div>

            <div className="mt-3">
                <Button
                    onClick={() => router.visit(route("login"))}
                    variant="secondary"
                    className="w-full"
                    type="button"
                >
                    <MoveLeftIcon size={15} className="mr-2" /> Back to login
                    page
                </Button>
            </div>
        </Form>
    );
};

export default ForgotPasswordForm;
