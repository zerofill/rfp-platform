// Fix: Create the JobManager component, which was previously missing.
import React, { useState, useMemo, useEffect } from 'react';
import { useAdminJobs } from '../../hooks/useAdminJobs';
import { Project } from '../../types';
import Button from '../ui/Button';
import JobEditorModal from './JobEditorModal';
import AdminJobDetail from './AdminJobDetail';

const JobManager: React.FC = () => {
    const { jobs, loading, error, addJob, updateJob, deleteJob } = useAdminJobs();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Project | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const selectedJob = useMemo(() => {
        if (!selectedJobId) return jobs.length > 0 ? jobs[0] : null;
        return jobs.find(j => j.id === selectedJobId) ?? (jobs.length > 0 ? jobs[0] : null);
    }, [jobs, selectedJobId]);

    // Effect to set initial selection
    useEffect(() => {
        if (jobs.length > 0 && !selectedJobId) {
            setSelectedJobId(jobs[0].id);
        }
    }, [jobs, selectedJobId]);


    const handleAddNew = () => {
        setEditingJob(null);
        setIsModalOpen(true);
    };

    const handleEdit = (job: Project) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleSave = (jobToSave: Project) => {
        if (jobToSave.id) {
            updateJob(jobToSave);
        } else {
            const newJob: Project = {
                ...jobToSave,
                id: `proj-${Date.now()}`,
                postedDate: new Date().toISOString(),
            };
            addJob(newJob);
        }
        setIsModalOpen(false);
        setEditingJob(null);
    };

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Job Management</h1>
                    <p className="mt-2 text-gray-600">Create, edit, and manage all job postings.</p>
                </div>
                <Button onClick={handleAddNew}>+ Create New Job</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow min-h-0">
                <div className="md:col-span-1 lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                     <div className="p-4 border-b flex-shrink-0">
                        <h2 className="font-semibold">All Jobs</h2>
                    </div>
                    <div className="overflow-y-auto flex-grow">
                        {jobs.map(job => (
                            <div 
                                key={job.id}
                                onClick={() => setSelectedJobId(job.id)}
                                className={`p-3 border-b cursor-pointer transition-colors ${selectedJob?.id === job.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <p className="font-semibold text-sm text-gray-800">{job.title}</p>
                                <p className="text-xs text-gray-500">{job.location} - <span className="capitalize">{job.trade}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
                    <AdminJobDetail job={selectedJob} onEdit={handleEdit} onDelete={deleteJob} />
                </div>
            </div>

            {isModalOpen && (
                <JobEditorModal
                    job={editingJob}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default JobManager;
