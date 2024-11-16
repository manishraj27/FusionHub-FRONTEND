import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const Login = () => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="space-y-5">
            <h1>Register</h1>
            <Form {...form} >
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
