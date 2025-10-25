// Fix: Create the useBids hook, which was previously missing.
import { useState, useEffect } from 'react';
import { Bid } from '../types';

const MOCK_BIDS: Bid[] = [
    { id: 'bid-001', projectId: 'proj-001', contractorId: 'user-123', contractorName: 'Precision Plumbing Inc.', amount: 150000, submittedDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), message: 'We can start immediately and have experience with high-rise retrofits.', isAwarded: false },
    { id: 'bid-002', projectId: 'proj-001', contractorId: 'user-456', contractorName: 'Bay Area Plumbers', amount: 175000, submittedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), isAwarded: false },
    { id: 'bid-003', projectId: 'proj-002', contractorId: 'user-789', contractorName: 'Cooling Solutions HVAC', amount: 250000, submittedDate: new Date().toISOString(), message: 'Our team is certified and ready to deploy.', isAwarded: false },
    { id: 'bid-004', projectId: 'proj-003', contractorId: 'user-101', contractorName: 'Oakland Electrical Co.', amount: 85000, submittedDate: new Date(new Date().setDate(new Date().getDate() - 9)).toISOString(), isAwarded: true },
    { id: 'bid-005', projectId: 'proj-004', contractorId: 'user-112', contractorName: 'Power Grid Electric', amount: 45000, submittedDate: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(), isAwarded: false },
    { id: 'bid-006', projectId: 'proj-004', contractorId: 'user-113', contractorName: 'Secure Power Systems', amount: 42500, submittedDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), isAwarded: false },
];


export const useBids = (projectId?: string | null) => {
    const [loading, setLoading] = useState(true);
    const [bids, setBids] = useState<Bid[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setBids([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            try {
                const projectBids = MOCK_BIDS.filter(bid => bid.projectId === projectId).sort((a,b) => a.amount - b.amount);
                setBids(projectBids);
            } catch (err) {
                setError('Failed to fetch bids.');
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [projectId]);
    
    const awardBid = (bidId: string) => {
        // In a real app, this would be an API call.
        // For the mock, we just update the local state.
        setBids(prevBids => 
            prevBids.map(bid => ({...bid, isAwarded: bid.id === bidId}))
        );
        // Also need to find the job and update its status... this logic might be better elsewhere,
        // but for a simple mock, this hook can just update its own data.
    };

    return { loading, bids, error, awardBid };
};
