import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import LoginForm from "@/Pages/Auth/Login/Partials/LoginForm";

const Show = () => {
    return (
        <GuestLayout>
            <Head title="Log in" />

            <h1 className="font-bold text-3xl text-center mb-2">
                Welcome back! 👋
            </h1>

            <p className="text-center mb-7 text-sm">
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
