import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DynamicForm } from '../components/DynamicForm';
import { api } from '../services/api';
import type { UserFormData } from '../config/schema';

export const UserFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<Partial<UserFormData>>({});
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            loadUser(id);
        }
    }, [id, isEditMode]);

    const loadUser = async (userId: string) => {
        try {
            setLoading(true);
            const user = await api.getUser(userId);
            // Strip id and other non-form fields if needed, but Partial<User> is compatible usually
            // However, we need to match UserFormData which excludes ID.
            const { id, ...formData } = user;
            setInitialValues(formData);
        } catch (err) {
            alert('Failed to load user');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: UserFormData) => {
        try {
            setLoading(true);
            if (isEditMode && id) {
                await api.updateUser(id, data);
            } else {
                await api.createUser(data);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to save user');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !initialValues.id) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 flex justify-center">
            <DynamicForm
                title={isEditMode ? 'Edit User' : 'Create New User'}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isLoading={loading}
                submitLabel={isEditMode ? 'Update User' : 'Create User'}
            />
        </div>
    );
};
