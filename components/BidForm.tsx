import React, { useState } from 'react';
import { Project } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';

interface BidFormProps {
    project: Project;
    onSubmit: (bid: { amount: number; message: string }) => void;
}

const BidForm: React.FC<BidFormProps> = ({ project, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bidAmount = parseFloat(amount);
        if (isNaN(bidAmount) || bidAmount <= 0) {
            setError('Please enter a valid bid amount.');
            return;
        }
        setError('');
        onSubmit({ amount: bidAmount, message });
        setAmount('');
        setMessage('');
    };

    return (
        <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Bid</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 150000"
                        required
                        hasError={!!error}
                    />
                    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Optional Message</label>
                    <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Include any notes about your bid..."
                    />
                </div>
                <div className="text-right">
                    <Button type="submit">Submit Bid</Button>
                </div>
            </form>
        </div>
    );
};

export default BidForm;
