import React from 'react';
import { Project } from '../types';

interface JobTeaserCardProps {
    job: Project;
}

const JobTeaserCard: React.FC<JobTeaserCardProps> = ({ job }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{job.location}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-200 text-gray-800 capitalize">{job.trade}</span>
                <span className="text-sm font-medium text-gray-700">Due: {new Date(job.dueDate).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default JobTeaserCard;
