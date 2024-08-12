import { FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import Form from "@/Components/custom/Form";
import SocialLogin from "./components/SocialLogin";

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <h1 className="font-bold text-3xl text-center mb-2">
                Welcome back! 👋
            </h1>

            <p className="text-center mb-7 text-sm">
                Not a member?{" "}
                <Link className="underline" href={route("register")}>
                    Start a 7 day free trial
                </Link>
            </p>

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

                <div className="mt-4">
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        label="Password"
                        errorMessage={errors.password}
                        showPassword
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </div>

                <div className="block mt-4">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm">Remember me</span>
                        </label>

                        <Link
                            href={route("password.request")}
                            className="underline text-sm"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        loadingText="Authenticating..."
                        className="w-full"
                        type="submit"
                    >
                        Sign in
                    </Button>
                </div>

                <SocialLogin />
            </Form>
        </GuestLayout>
    );
}
