import GuestLayout from "@/layouts/guest-layout";
import LoginForm from "@/pages/auth/login/partials/login-form";
import { Head, Link } from "@inertiajs/react";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Log in" />

            <h1 className="font-bold text-[23px] sm:text-[28px] sm:text-center mb-1">Welcome back! 👋</h1>

            <p className="sm:text-center mb-7 text-sm">
                Not a member?{" "}
                <Link className="underline" href={route("register")}>
                    Start a 7 day free trial
                </Link>
            </p>

            <LoginForm />
        </GuestLayout>
    );
};

export default Show;
