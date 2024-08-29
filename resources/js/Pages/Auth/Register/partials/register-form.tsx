import SocialLogin from "@/components/custom/auth/social-login";
import Form from "@/components/custom/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const RegisterForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
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

            <div className="mt-6">
                <Button className="w-full" type="submit">
                    Start your free trial
                </Button>
            </div>

            <SocialLogin />

            <p className="text-sm mt-6 leading-relaxed">
                By clicking "Start your free trial" above or signing up via a
                social provider, you agree to our{" "}
                <Link href="/" className="underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="underline">
                    Privacy Policy
                </Link>
                .
            </p>
        </Form>
    );
};

export default RegisterForm;
