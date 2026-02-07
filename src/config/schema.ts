import { z } from 'zod';

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date';

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    validation: z.ZodTypeAny;
    placeholder?: string;
}

export const userFields: FieldConfig[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validation: z.string().min(1, 'First name is required'),
        placeholder: 'John'
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        validation: z.string().min(1, 'Last name is required'),
        placeholder: 'Doe'
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validation: z.string().email('Invalid email address'),
        placeholder: 'john@example.com'
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        validation: z.string().min(10, 'Phone number must be at least 10 digits'),
        placeholder: '123-456-7890'
    }
];

// Helper to generate Zod schema from config
export const generateUserSchema = () => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    userFields.forEach(field => {
        schemaShape[field.name] = field.validation;
    });

    return z.object(schemaShape);
};

export const userSchema = generateUserSchema();
export type UserFormData = z.infer<typeof userSchema>;
