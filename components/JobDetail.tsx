
import React from 'react';
import { Project, JobStatus } from '../types';
import BidForm from './BidForm';

interface JobDetailProps {
  job: Project | null;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Select a job to view details</h2>
          <p className="text-gray-500 mt-2">Choose a job from the list on the left to see its full description and submit a bid.</p>
        </div>
      </div>
    );
  }

  const handleBidSubmit = (bid: { amount: number; message: string }) => {
    // In a real app, this would make an API call.
    alert(`Bid of $${bid.amount} submitted for ${job.title} with message: "${bid.message}"`);
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
        <span>{job.location}</span>
        <span>&bull;</span>
        <span className="capitalize">Trade: {job.trade}</span>
        <span>&bull;</span>
        <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
      </div>
      
      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Project Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
      </div>

      {job.status === JobStatus.LIVE && (
        <BidForm project={job} onSubmit={handleBidSubmit} />
      )}
      {job.status === JobStatus.AWARDED && (
          <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200">
              This job has been awarded to another contractor.
          </div>
      )}
      {job.status === JobStatus.CLOSED && (
          <div className="mt-8 p-4 bg-gray-100 text-gray-700 rounded-md border">
              Bidding for this job is now closed.
          </div>
      )}
    </div>
  );
};

export default JobDetail;
