
import React, { useState, useMemo, useEffect } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useProfile } from '../hooks/useProfile';
import JobList from './JobList';
import JobDetail from './JobDetail';

const Dashboard: React.FC = () => {
  const { profile } = useProfile();
  const userTrade = profile.trade as string;
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs(userTrade);

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  useEffect(() => {
    // Select the first job in the list by default if there isn't one selected
    if (!selectedJobId && jobs.length > 0) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  const selectedJob = useMemo(() => {
    return jobs.find(job => job.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  if (jobsError) {
    return <div className="text-red-500 p-4">Error: {jobsError}</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
                <div className="text-sm text-gray-600">
                    <p>Welcome, <span className="font-semibold">{profile.companyName as string}</span></p>
                    <p>Primary Trade: <span className="font-semibold capitalize">{userTrade}</span></p>
                </div>
            </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
                <div className="md:col-span-1 lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <div className="p-4 border-b flex-shrink-0">
                        <h2 className="font-semibold">Jobs for your trade</h2>
                    </div>
                    <div className="overflow-y-auto flex-grow">
                       <JobList 
                            jobs={jobs}
                            selectedJobId={selectedJobId}
                            onSelectJob={setSelectedJobId}
                            isLoading={jobsLoading}
                        />
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
                    <JobDetail job={selectedJob} />
                </div>
            </div>
        </main>
    </div>
  );
};

export default Dashboard;
