// Fix: Create the BidList component, which was previously missing.
import React from 'react';
import { useBids } from '../../hooks/useBids';
import Button from '../ui/Button';

interface BidListProps {
  projectId: string | null;
}

const BidList: React.FC<BidListProps> = ({ projectId }) => {
  const { bids, loading, error, awardBid } = useBids(projectId);

  if (loading) {
    return <div className="text-gray-500">Loading bids...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (bids.length === 0) {
    return <div className="text-gray-500 p-4 border rounded-md bg-gray-50 text-center">No bids have been submitted for this project yet.</div>;
  }

  const handleAward = (bidId: string) => {
      if(window.confirm('Are you sure you want to award this bid? This will notify the contractor.')) {
        awardBid(bidId);
        alert('Bid awarded! In a real app, the job status would be updated and notifications sent.');
      }
  };

  return (
    <div className="space-y-4">
      {bids.map(bid => (
        <div key={bid.id} className={`p-4 border rounded-md shadow-sm relative ${bid.isAwarded ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{bid.contractorName}</p>
              <p className="text-sm text-gray-500">Submitted: {new Date(bid.submittedDate).toLocaleString()}</p>
            </div>
            <p className="text-lg font-bold text-gray-900">${bid.amount.toLocaleString()}</p>
          </div>
          {bid.message && <p className="mt-3 text-sm text-gray-600 border-t pt-3">{bid.message}</p>}
          <div className="mt-4 flex justify-end">
            {bid.isAwarded ? (
                <span className="px-3 py-1 text-sm font-bold text-green-800 bg-green-200 rounded-full">Awarded</span>
            ) : (
                <Button onClick={() => handleAward(bid.id)} variant="primary">
                    Award Bid
                </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidList;
