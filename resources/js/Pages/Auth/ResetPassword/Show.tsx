import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import ResetPasswordForm from "@/Pages/Auth/ResetPassword/Partials/ResetPasswordForm";

const Show = ({ token, email }: { token: string; email: string }) => {
    return (
        <GuestLayout>
            <Head title="Reset your password" />

            <h1 className="font-bold text-3xl text-center mb-7">
                Reset your password 🤫
            </h1>

            <ResetPasswordForm token={token} email={email} />
        </GuestLayout>
    );
};

export default Show;
