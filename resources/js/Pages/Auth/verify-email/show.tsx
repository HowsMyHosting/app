import GuestLayout from "@/layouts/guest-layout";
import ResendEmailVerificationForm from "@/pages/auth/verify-email/partials/resend-email-verification-form";
import { Head } from "@inertiajs/react";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Forgot password" />

            <h1 className="font-bold text-[23px] sm:text-[28px] sm:text-center mb-4">Verify your email 🤔</h1>

            <p className="sm:text-center mb-6 sm:mb-8 text-sm">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>

            <ResendEmailVerificationForm />
        </GuestLayout>
    );
};

export default Show;
