import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiconfig from './../../../configurations/APIConfig';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Define the Zod validation schema
    const loginSchema = z.object({
        email: z.string()
            .nonempty('Email is required')
            .email('Enter a valid email'),
        password: z.string()
            .nonempty('Password is required')
            .min(8, 'Password must be at least 8 characters long'),
    });

    // Integrate zod schema with react-hook-form
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiconfig.samaa_api}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                // Add success animation
                setIsLoading(false);
                onLogin(result.jwt);
                navigate('/');
            } else {
                setError('Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Please try logging in again');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setError('');
        window.location.href = `${apiconfig.samaa_api}/api/auth/oauth2/authorize/google`;
    };

    const errorAlertClass = "mb-4 transition-all duration-300 ease-in-out " + 
                          (error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (token) {
            onLogin(token);
            navigate('/');
        }
    }, [navigate, onLogin]);

    return (
        <div className="space-y-4">
            
            {error && (
                <Alert 
                    variant="destructive" 
                    className={errorAlertClass}
                >
                    <AlertDescription className="text-sm font-medium">
                        {error}
                    </AlertDescription>
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
                                            <div className="relative group">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-primary" />
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="pl-10 transition-all duration-200 hover:border-primary focus:ring-2 focus:ring-primary/20"
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
                                            <div className="relative group">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-primary" />
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="pl-10 transition-all duration-200 hover:border-primary focus:ring-2 focus:ring-primary/20"
                                                />
                                                
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full relative overflow-hidden transition-all duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>

                            <div className="relative my-4">
                             
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className=" text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleLogin}
                                className="w-full transition-all duration-200"
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign in with Google
                            </Button>
                        </form>
                    </Form>
             
           
        </div>
    );
};

export default Login;