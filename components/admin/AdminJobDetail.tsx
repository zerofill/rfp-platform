// Fix: Create the AdminJobDetail component, which was previously missing.
import React from 'react';
import { Project, JobStatus } from '../../types';
import Button from '../ui/Button';
import BidList from './BidList';

interface AdminJobDetailProps {
  job: Project | null;
  onEdit: (job: Project) => void;
  onDelete: (jobId: string) => void;
}

const AdminJobDetail: React.FC<AdminJobDetailProps> = ({ job, onEdit, onDelete }) => {
  if (!job) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Select a job to view details</h2>
          <p className="text-gray-500 mt-2">Choose a job from the list to see its description and manage bids.</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
          onDelete(job.id);
      }
  }

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                <span>{job.location}</span>
                <span>&bull;</span>
                <span className="capitalize">Trade: {job.trade}</span>
                <span>&bull;</span>
                <span>Due: {new Date(job.dueDate).toLocaleDateString()}</span>
            </div>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
            <Button onClick={() => onEdit(job)} variant="secondary">Edit</Button>
            <Button onClick={handleDelete} variant="secondary">Delete</Button>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Project Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Received Bids</h2>
        <BidList projectId={job.id} />
      </div>

    </div>
  );
};

export default AdminJobDetail;
