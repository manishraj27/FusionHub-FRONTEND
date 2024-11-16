import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Login = ({ onLogin }) => {
    const [error, setError] = useState('');
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:2004/auth/signin', {
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
        <div className="space-y-5">
            <h1>Sign In</h1>
            {error && <p className="text-red-500">{error}</p>}
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border-gray-700 py-5 px-5"
                                    />
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
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full border-gray-700 py-5 px-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-5">
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;

