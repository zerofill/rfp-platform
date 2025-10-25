import React from 'react';
import { useAdminJobs } from '../hooks/useAdminJobs';
import Login from './Login';
import JobTeaserCard from './JobTeaserCard';

const PublicView: React.FC = () => {
  const { jobs, loading } = useAdminJobs(); // Using admin jobs to get a mix of trades

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Find Your Next Big Project
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            The premier platform for connecting qualified contractors with high-value construction RFPs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recently Posted Jobs</h2>
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                jobs.slice(0, 3).map(job => (
                    <JobTeaserCard key={job.id} job={job} />
                ))
            )}
             {jobs.length > 3 && <p className="text-center text-gray-600">...and many more!</p>}
          </div>
          
          <div className="row-start-1 md:col-start-2 lg:col-start-3">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
