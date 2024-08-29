import GuestLayout from "@/layouts/guest-layout";
import RegisterForm from "@/pages/auth/register/partials/register-form";
import { Head, Link } from "@inertiajs/react";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Register" />

            <h1 className="font-bold text-3xl text-center mb-2">
                Sign up today 🚀
            </h1>

            <p className="text-center mb-7 text-sm">
                Already have an account?{" "}
                <Link className="underline" href={route("login")}>
                    Sign into your account
                </Link>
            </p>

            <RegisterForm />
        </GuestLayout>
    );
};

export default Show;
