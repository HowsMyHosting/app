import GuestLayout from "@/layouts/guest-layout";
import ResetPasswordForm from "@/pages/auth/reset-password/partials/reset-password-form";
import { Head } from "@inertiajs/react";

const Show = ({ token, email }: { token: string; email: string }) => {
    return (
        <GuestLayout>
            <Head title="Reset your password" />

            <h1 className="font-bold text-[23px] sm:text-3xl sm:text-center mb-7">
                Reset your password 🤫
            </h1>

            <ResetPasswordForm token={token} email={email} />
        </GuestLayout>
    );
};

export default Show;
