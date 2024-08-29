import Checkbox from "@/components/checkbox";
import SocialLogin from "@/components/custom/auth/social-login";
import Form from "@/components/custom/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const LoginForm = () => {
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
                <Button className="w-full" type="submit">
                    Sign in
                </Button>
            </div>

            <SocialLogin />
        </Form>
    );
};

export default LoginForm;
