export type Steps = Array<Step>;

export type Step = {
    label: string;
    passed: boolean;
    current: boolean;
};
