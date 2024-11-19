import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    const [error, setError] = useState('');
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:2000/admin/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                onLogin(result.jwt);
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <LockKeyhole className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center font-bold">Admin Login</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your credentials to access the admin panel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="admin@example.com"
                                                    className="pl-10"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="pl-10"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-500">
                    Protected area. Authorized personnel only.
                </CardFooter>
            </Card>
        </div>
    );
};

export default AdminLogin;