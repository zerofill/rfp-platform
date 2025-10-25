
import React from 'react';
import { Project } from '../types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Project[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedJobId, onSelectJob, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 space-y-2">
        <div className="animate-pulse bg-gray-200 h-24 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-24 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-24 rounded-md"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return <div className="p-6 text-center text-gray-500">No available jobs match your profile's primary trade.</div>;
  }
  
  return (
    <div className="divide-y divide-gray-200">
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job}
          onSelect={onSelectJob}
          isSelected={job.id === selectedJobId}
        />
      ))}
    </div>
  );
};

export default JobList;
