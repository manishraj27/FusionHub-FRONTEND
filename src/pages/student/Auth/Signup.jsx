
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onLogin }) => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            fullName: ''
        },
    });

    const onSubmit = async (data) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            };

            const response = await axios.post(
                'http://localhost:2004/api/auth/signup',
                {
                    email: data.email,
                    password: data.password,
                    fullName: data.fullName
                },
                config
            );

            if (response.data && response.data.jwt) {
                localStorage.setItem('authToken', response.data.jwt);
                navigate('/login');
            }
        } catch (error) {
            if (error.response?.data?.message?.includes('email already exist')) {
                form.setError('email', {
                    type: 'manual',
                    message: 'This email is already registered'
                });
            } else {
                form.setError('root', {
                    type: 'manual',
                    message: error.response?.data?.message || 'Registration failed. Please try again.'
                });
            }
        }
    };

    return (
        <div className="space-y-4">
            {form.formState.errors.root && (
                <Alert variant="destructive">
                    <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                </Alert>
            )}
            
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="John Doe"
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
                                            placeholder="name@example.com"
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
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Creating account..." : "Create account"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Signup;