import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFields, userSchema, type UserFormData } from '../config/schema';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

interface DynamicFormProps {
    initialValues?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
    title: string;
}

export const DynamicForm = ({
    initialValues,
    onSubmit,
    isLoading,
    submitLabel = 'Submit',
    title
}: DynamicFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: initialValues || {}
    });

    return (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {userFields.map((field) => (
                    <Input
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type === 'tel' ? 'tel' : field.type}
                        error={errors[field.name]?.message as string}
                        {...register(field.name)}
                    />
                ))}

                <div className="flex gap-4 mt-6">
                    <Button type="button" variant="secondary" onClick={() => navigate('/')} className="w-full">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading} className="w-full">
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </div>
    );
};
