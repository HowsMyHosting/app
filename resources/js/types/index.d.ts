import { UUID } from "crypto";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    finished_initial_setup: boolean;
    initial_setup_step: number;
    hasCloudwaysIntegration: boolean;
    addedFirstApp: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
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
    uuid: UUID;
    app_id: string;
    label: string;
    status: "pending" | "connected" | "disconnected";
};
