export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    // Dynamic fields will be added here loosely, but for TS we might want an index signature or just keep it strict for now.
    [key: string]: any;
}
