import Form from "@/components/custom/form";
import Stepper from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocalCloudwaysApp } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const EditReportingEmail = ({
    showStepper = false,
    cloudwaysApp,
}: {
    showStepper?: boolean;
    cloudwaysApp: LocalCloudwaysApp;
}) => {
    const steps = [
        {
            label: "Connect to Cloudways",
            passed: true,
            current: false,
        },
        {
            label: "Add an app/website",
            passed: true,
            current: false,
        },
        {
            label: "Choose reporting data",
            passed: true,
            current: false,
        },
        {
            label: "Set up email report",
            passed: false,
            current: true,
        },
    ];

    const { setData, post, processing, errors, data } = useForm({
        subject: `${cloudwaysApp.label} Monthly Report`,
        recipients: [] as string[],
        intro: `Hello 👋,

Here's your monthly report for ${cloudwaysApp.label}.`,
        signature: `Best regards,
Your Company Name`,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("emailReport.store", cloudwaysApp));
    };

    return (
        <>
            {showStepper && (
                <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                    <Stepper steps={steps} />
                </div>
            )}

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[40px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">
                    Set up email report
                </h1>

                <p className="mb-7 text-sm">
                    {/* TODO: this can be improved below... */}
                    Set up the monthly email report for {cloudwaysApp.label}. It
                    will be sent on the first day of every month to the
                    recipients you specify below.
                </p>

                <Form onSubmit={submit} isLoading={processing}>
                    <div className="mb-4">
                        <Input
                            name="recipients"
                            label="Recipient(s)"
                            errorMessage={errors.recipients}
                            placeholder="john@doe.com, jane@doe.com"
                            autoFocus
                            value={data.recipients.join(", ")}
                            onChange={(e) =>
                                setData(
                                    "recipients",
                                    e.target.value
                                        .split(",")
                                        .map((recipient) => recipient.trim()),
                                )
                            }
                        />

                        <p className="text-xs text-muted-foreground mt-[5px]">
                            Separate multiple emails with commas.
                        </p>
                    </div>

                    <div className="mb-4">
                        <Input
                            name="subject"
                            label="Subject line"
                            errorMessage={errors.subject}
                            value={data.subject}
                            onChange={(e) => setData("subject", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Textarea
                            name="intro"
                            label="Intro paragraph"
                            errorMessage={errors.intro}
                            rows={4}
                            value={data.intro}
                            onChange={(e) => setData("intro", e.target.value)}
                        />
                    </div>

                    <div className="mb-7">
                        <Textarea
                            name="signature"
                            label="Signature"
                            errorMessage={errors.signature}
                            rows={4}
                            value={data.signature}
                            onChange={(e) =>
                                setData("signature", e.target.value)
                            }
                        />
                    </div>

                    <Button type="submit" loadingText="Saving...">
                        Save email
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default EditReportingEmail;
