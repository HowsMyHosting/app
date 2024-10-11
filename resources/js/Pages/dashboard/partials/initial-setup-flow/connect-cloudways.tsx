import Form from "@/components/custom/form";
import Stepper from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Steps } from "@/types/stepper";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const ConnectCloudways = ({ steps }: { steps: Steps }) => {
    const { setData, post, processing, errors } = useForm({
        api_key: "",
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("cloudwaysIntegration.store"));
    };

    return (
        <>
            <div className="w-full sm:max-w-md sm:mt-[40px] mx-auto pt-6 sm:pt-12">
                <Stepper steps={steps} />
            </div>

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-3">
                    Connect to Cloudways
                </h1>

                <p className="mb-7 text-sm">
                    Hi there! 👋 Just grab your API key from your{" "}
                    <a
                        href="https://platform.cloudways.com/api"
                        target="_blank"
                        rel="nofollow"
                        className="underline"
                    >
                        your Cloudways account
                    </a>{" "}
                    and pop it in below to get started!
                </p>

                <Form onSubmit={submit} isLoading={processing}>
                    <div className="mb-4">
                        <Input
                            name="email"
                            placeholder="Your Cloudways email"
                            errorMessage={errors.email}
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>

                    <div className="mb-7">
                        <Input
                            name="api_key"
                            placeholder="Your API key"
                            errorMessage={errors.api_key}
                            onChange={(e) => setData("api_key", e.target.value)}
                        />
                    </div>

                    <Button type="submit" loadingText="Connecting...">
                        Connect to Cloudways
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default ConnectCloudways;
