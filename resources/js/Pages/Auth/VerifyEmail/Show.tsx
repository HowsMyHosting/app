import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import ResendEmailVerificationForm from "@/Pages/Auth/VerifyEmail/Partials/ResendEmailVerificationForm";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Forgot password" />

            <h1 className="font-bold text-3xl text-center mb-5">
                Verify your email 🤔
            </h1>

            <p className="text-center mb-7 text-sm">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </p>

            <ResendEmailVerificationForm />
        </GuestLayout>
    );
};

export default Show;
