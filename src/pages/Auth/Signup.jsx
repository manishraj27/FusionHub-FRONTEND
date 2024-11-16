import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            fullName: ''  // Changed from fullname to fullName to match backend
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
                'http://localhost:2004/auth/signup',
                {
                    email: data.email,
                    password: data.password,
                    fullName: data.fullName  // Match the backend field name
                },
                config
            );

            if (response.data && response.data.jwt) {  // Changed from token to jwt based on your AuthResponse
                localStorage.setItem('authToken', response.data.jwt);
                console.log(response.data.message); // Will show "signup success"
                navigate('/login'); // Redirect to login page after successful signup
            }
        } catch (error) {
            console.error('Error during signup:', error.response?.data || error.message);
            // Handle specific error cases
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            
            {/* Display form-level errors */}
            {form.formState.errors.root && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {form.formState.errors.root.message}
                </div>
            )}
            
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="fullName"  // Changed from fullname to fullName
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full border rounded py-2 px-3"
                                    />
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
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border rounded py-2 px-3"
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
                                        className="w-full border rounded py-2 px-3"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Signup;