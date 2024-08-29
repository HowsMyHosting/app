import Form from "@/components/custom/form";
import { Button } from "@/components/ui/button";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const ResendEmailVerificationForm = () => {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Form onSubmit={submit} isLoading={processing}>
            <div className="mt-6">
                <Button className="w-full" type="submit">
                    Resend email verification
                </Button>
            </div>

            <div className="mt-3">
                <Button
                    onClick={() => router.post(route("logout"))}
                    variant="secondary"
                    className="w-full"
                    type="button"
                >
                    Log out
                </Button>
            </div>
        </Form>
    );
};

export default ResendEmailVerificationForm;
