import Form from "@/components/custom/form";
import Stepper from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { initialSetupSteps } from "@/lib/utils";
import { LocalCloudwaysApp } from "@/types";
import { useForm } from "@inertiajs/react";
import { UUID } from "crypto";
import { MailPlusIcon } from "lucide-react";
import { FormEventHandler } from "react";

type EditReportingEmailProps = {
    showStepper?: boolean;
    cloudwaysApp?: LocalCloudwaysApp;
    cloudwaysApps?: LocalCloudwaysApp[];
};

type BulkRecipients = {
    cloudwaysAppUuid: UUID;
    recipients: string[];
};

const EditReportingEmail = ({ showStepper = false, cloudwaysApp, cloudwaysApps }: EditReportingEmailProps) => {
    const isBulk = cloudwaysApps && cloudwaysApps.length > 1;

    const { setData, post, processing, errors, data } = useForm({
        subject: `${isBulk ? `[$appName]` : cloudwaysApp?.label} Monthly Report`,
        recipients: [] as string[],
        intro: `Hello 👋,

Here's your monthly report for ${isBulk ? `[$appName]` : cloudwaysApp?.label}.`,
        signature: `Best regards,
Your Company Name`,
        cloudwaysApps: [] as string[],
        bulkRecipients:
            cloudwaysApps?.map((app) => ({
                cloudwaysAppUuid: app.uuid,
                recipients: [],
            })) || ([] as BulkRecipients[]),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isBulk) {
            setData(
                "cloudwaysApps",
                cloudwaysApps.map((app) => app.uuid),
            );
        }

        post(isBulk ? route("emailReport.store.bulk") : route("emailReport.store", cloudwaysApp));
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const allEmailsValidForApp = (emails: string[]) => {
        return emails.length > 0 && emails.every(isValidEmail);
    };

    const countValidAppConfigurations = () => {
        return data.bulkRecipients.filter((recipient) => allEmailsValidForApp(recipient.recipients)).length;
    };

    return (
        <>
            {showStepper && (
                <div className="w-full sm:max-w-md mt-[10px] sm:mt-[30px] mx-auto pt-4">
                    <Stepper steps={initialSetupSteps("setupEmailReport")} />
                </div>
            )}

            <div className="w-full sm:max-w-md mt-[10px] sm:mt-[30px] mx-auto pt-4">
                <h1 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-3">Set up email report</h1>

                <p className="mb-7 text-sm">
                    Set up the monthly email report for {isBulk ? "your apps" : cloudwaysApp?.label}. It will be sent on
                    the first day of every month to the recipients you specify below.
                </p>

                <Form onSubmit={submit} isLoading={processing}>
                    {isBulk ? (
                        <Sheet>
                            <SheetTrigger asChild>
                                <div className="flex items-center space-x-2.5 mb-4">
                                    <Button size="sm" variant="secondary">
                                        <MailPlusIcon size={15} className="mr-[7px]" /> Add Recipients
                                    </Button>

                                    <span
                                        className={`block text-sm ${
                                            countValidAppConfigurations() === cloudwaysApps.length
                                                ? "text-green-600"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {countValidAppConfigurations()}/{cloudwaysApps.length} Complete
                                    </span>
                                </div>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:w-[600px] min-h-full overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Add each apps recipient(s)</SheetTitle>
                                    <SheetDescription className="text-muted-foreground">
                                        Specify the recipient(s) for the monthly report email for each app you're
                                        configuring. Separate multiple emails with commas.
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="mt-8 mb-5">
                                    {cloudwaysApps?.map((app) => (
                                        <div className="mb-5" key={app.uuid}>
                                            <Input
                                                name="recipients"
                                                label={`${app.label} recipient(s)`}
                                                placeholder="john@doe.com, jane@doe.com"
                                                value={
                                                    data.bulkRecipients
                                                        .find((recipient) => recipient.cloudwaysAppUuid === app.uuid)
                                                        ?.recipients.join(", ") || ""
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "bulkRecipients",
                                                        data.bulkRecipients.map((recipient) => {
                                                            if (recipient.cloudwaysAppUuid === app.uuid) {
                                                                return {
                                                                    ...recipient,
                                                                    recipients: e.target.value
                                                                        .split(",")
                                                                        .map((email) => email.trim()),
                                                                };
                                                            }
                                                            return recipient;
                                                        }),
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>

                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="button" size="sm">
                                            Continue
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    ) : (
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
                                        e.target.value.split(",").map((recipient) => recipient.trim()),
                                    )
                                }
                            />

                            <p className="text-xs text-muted-foreground mt-[5px]">
                                Separate multiple emails with commas.
                            </p>
                        </div>
                    )}

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
                            onChange={(e) => setData("signature", e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="sm"
                        loadingText="Saving..."
                        disabled={
                            !data.subject ||
                            (!isBulk && !allEmailsValidForApp(data.recipients)) ||
                            (isBulk && countValidAppConfigurations() !== cloudwaysApps.length)
                        }
                    >
                        {isBulk ? "Save emails" : "Save email"}
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default EditReportingEmail;
