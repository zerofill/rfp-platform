import { useState, useEffect } from 'react';
import { Project, JobStatus } from '../types';

const MOCK_JOBS: Project[] = [
  {
    id: 'proj-001',
    title: 'Downtown High-Rise Plumbing Retrofit',
    status: JobStatus.LIVE,
    location: 'San Francisco, CA',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    postedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    trade: 'plumbing',
    description: 'Seeking qualified plumbing contractors for a complete plumbing system retrofit for a 40-story commercial high-rise. Project includes replacement of all supply lines, waste stacks, and fixtures. Must have experience with large-scale commercial projects and be able to work within a tight schedule.'
  },
  {
    id: 'proj-002',
    title: 'New Retail Center HVAC Installation',
    status: JobStatus.LIVE,
    location: 'San Jose, CA',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString(),
    postedDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    trade: 'hvac',
    description: 'Installation of a new HVAC system for a 150,000 sq ft retail shopping center. Includes rooftop units, ductwork, and control systems. Bidders must be licensed and insured in the state of California.'
  },
  {
    id: 'proj-003',
    title: 'Medical Clinic Electrical Wiring',
    status: JobStatus.AWARDED,
    location: 'Oakland, CA',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
    postedDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    trade: 'electrical',
    description: 'Complete electrical wiring for a new 20,000 sq ft medical clinic. Includes power, lighting, and low-voltage systems for medical equipment. Project has been awarded.'
  },
  {
    id: 'proj-004',
    title: 'Residential Complex Generator Installation',
    status: JobStatus.LIVE,
    location: 'San Francisco, CA',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
    postedDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    trade: 'electrical',
    description: 'Installation of a backup power generator for a 200-unit residential complex. Work includes concrete pad, fuel lines, and electrical tie-in.'
  },
  {
    id: 'proj-005',
    title: 'School Boiler Replacement',
    status: JobStatus.CLOSED,
    location: 'Berkeley, CA',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    postedDate: new Date(new Date().setDate(new Date().getDate() - 40)).toISOString(),
    trade: 'hvac',
    description: 'Emergency replacement of two commercial boilers for a local elementary school. This job is now closed.'
  }
];


export const useAdminJobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      try {
        // Admin gets all jobs, sorted by most recent
        setJobs(MOCK_JOBS.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()));
      } catch (err) {
        setError('Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  const updateJob = (jobToUpdate: Project) => {
      setJobs(prevJobs => prevJobs.map(j => j.id === jobToUpdate.id ? jobToUpdate : j));
  };
  
  const addJob = (jobToAdd: Project) => {
      setJobs(prevJobs => [jobToAdd, ...prevJobs]);
  };
  
  const deleteJob = (jobId: string) => {
      setJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));
  };

  return { loading, jobs, error, addJob, updateJob, deleteJob };
};
