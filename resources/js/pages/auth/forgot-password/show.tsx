import GuestLayout from "@/layouts/guest-layout";
import ForgotPasswordForm from "@/pages/auth/forgot-password/partials/forgot-password-form";
import { Head } from "@inertiajs/react";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Forgot password" />

            <h1 className="font-bold text-[23px] sm:text-[28px] sm:text-center mb-4">Forgot your password? 🤔</h1>

            <p className="sm:text-center mb-7 text-sm">
                No problem! Just let us know your email address and we will email you a password reset link that will
                allow you to choose a new one.
            </p>

            <ForgotPasswordForm />
        </GuestLayout>
    );
};

export default Show;
