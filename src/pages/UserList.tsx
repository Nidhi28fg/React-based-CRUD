import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types/user';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Pencil, Trash2, Plus } from 'lucide-react';

export const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await api.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                <Link to="/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} /> Add User
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/edit/${user.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                        <Pencil size={16} className="text-blue-600" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <Trash2 size={16} className="text-red-600" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Phone:</span> {user.phone}
                            </div>
                            {/* Example of how dynamic fields could be displayed if we had a config for list view too */}
                        </div>
                    </div>
                ))}

                {users.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No users found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};
