export type NotificationType = "SUCCESS" | "FAIL" | "INFO";

export interface INotification {
    id: string;
    message: string;
    type: NotificationType;
}