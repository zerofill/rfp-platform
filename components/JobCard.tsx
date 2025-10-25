
import React from 'react';
import { Project, JobStatus } from '../types';
import Icon from './ui/Icon';

interface JobCardProps {
  job: Project;
  onSelect: (jobId: string) => void;
  isSelected: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelect, isSelected }) => {
  const daysRemaining = Math.ceil((new Date(job.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  const statusColor = {
    [JobStatus.LIVE]: 'bg-green-100 text-green-800',
    [JobStatus.AWARDED]: 'bg-yellow-100 text-yellow-800',
    [JobStatus.CLOSED]: 'bg-gray-100 text-gray-800',
  };

  return (
    <div 
      onClick={() => onSelect(job.id)}
      className={`p-4 border-l-4 cursor-pointer transition-all duration-200 ${isSelected ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-transparent hover:bg-gray-50 hover:shadow-sm'}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800 text-lg">{job.title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor[job.status]}`}>{job.status}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">{job.location}</p>
      <div className="flex items-center text-sm text-gray-600 mt-4 space-x-4">
        <div className="flex items-center">
            <Icon name="calendar" className="w-4 h-4 mr-1.5 text-gray-400" />
            <span>{daysRemaining > 0 ? `${daysRemaining} days left to bid` : 'Bidding closed'}</span>
        </div>
        <div className="flex items-center capitalize">
            <span className="font-bold text-gray-400 mr-1.5 text-lg">#</span>
            <span>{job.trade}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
