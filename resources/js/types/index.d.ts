import { UUID } from "crypto";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    finished_initial_setup: boolean;
    hasCloudwaysIntegration: boolean;
    addedFirstApp: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    session: {
        toast: {
            type: "success" | "error";
            message: string;
            description: string;
            id: string;
        };
    };
};

export type LocalCloudwaysApp = {
    id: number;
    uuid: UUID;
    app_id: string;
    label: string;
    status: "pending" | "connected" | "disconnected";
    has_email_report: boolean;
    has_reporting_data: boolean;
};
