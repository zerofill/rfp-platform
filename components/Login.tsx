import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from './ui/Input';
import Button from './ui/Button';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            login(email);
        }
    };
    
    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">Contractor & Admin Login</h2>
            <p className="text-center text-gray-500 mt-2">Access the job portal.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contractor@example.com"
                        required
                    />
                 </div>
                 <div className="text-sm text-gray-500">
                     <p>Use one of the following emails to log in:</p>
                     <ul className="list-disc list-inside mt-1">
                         <li><code className="bg-gray-100 p-1 rounded">contractor@example.com</code></li>
                         <li><code className="bg-gray-100 p-1 rounded">admin@example.com</code></li>
                     </ul>
                 </div>
                 <div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                 </div>
            </form>
        </div>
    );
};

export default Login;
