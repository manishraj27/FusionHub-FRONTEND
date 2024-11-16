import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@/components/ui/button";

const Auth = ({ onLogin }) => {
    const [active, setActive] = useState(true);

    return (
        <div className="loginContainer min-h-screen flex items-center justify-center bg-gray-50">
            <div className="box h-[30rem] w-[25rem] bg-white rounded-lg shadow-lg">
                <div className="minContainer login">
                    <div className="loginBox w-full px-10 space-y-5 py-8">
                        {active ? <Signup onLogin={onLogin} /> : <Login onLogin={onLogin} />}

                        <div className="flex items-center justify-center gap-2 mt-4">
                            <span className="text-gray-600 text-sm">
                                {active ? "Already have an account?" : "Don't have an account?"}
                            </span>
                            <Button variant="ghost" onClick={() => setActive(!active)}>
                                {active ? 'Login' : 'Signup'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;