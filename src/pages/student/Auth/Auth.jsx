import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = ({ onLogin }) => {
    const [active, setActive] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {active ? "Create an Account" : "Welcome Back"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {active
                            ? "Enter your details to create your account"
                            : "Enter your credentials to access your account"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {active ? <Signup onLogin={onLogin} /> : <Login onLogin={onLogin} />}
                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-500">
                            {active ? "Already have an account?" : "Don't have an account?"}
                        </span>
                        <Button
                            variant="link"
                            className="text-blue-600 hover:text-blue-700 ml-1"
                            onClick={() => setActive(!active)}
                        >
                            {active ? "Sign in" : "Sign up"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Auth;