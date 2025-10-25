import React, { useState, useEffect } from 'react';
import { Project, JobStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface JobEditorModalProps {
    job: Project | null;
    onSave: (job: Project) => void;
    onClose: () => void;
}

const JobEditorModal: React.FC<JobEditorModalProps> = ({ job, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        location: '',
        trade: 'plumbing',
        status: JobStatus.LIVE,
        description: '',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    useEffect(() => {
        if (job) {
            setFormData({ ...job, dueDate: new Date(job.dueDate).toISOString().split('T')[0] });
        }
    }, [job]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.title || !formData.location || !formData.trade || !formData.dueDate) {
            alert('Please fill all required fields.');
            return;
        }
        onSave(formData as Project);
    };

    const statusOptions = Object.values(JobStatus).map(s => ({ value: s, label: s }));
    // In a real app, trades would come from a config/API
    const tradeOptions = [
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'hvac', label: 'HVAC' },
        { value: 'electrical', label: 'Electrical' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{job ? 'Edit Job' : 'Create New Job'}</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <Input id="title" name="title" type="text" value={formData.title || ''} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <Input id="location" name="location" type="text" value={formData.location || ''} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Bid Due Date</label>
                        <Input id="dueDate" name="dueDate" type="date" value={formData.dueDate || ''} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="trade" className="block text-sm font-medium text-gray-700">Trade</label>
                        <Select id="trade" name="trade" value={formData.trade || ''} onChange={handleChange} required options={tradeOptions} />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <Select id="status" name="status" value={formData.status || ''} onChange={handleChange} required options={statusOptions} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={6}
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="bg-gray-50 p-4 flex justify-end space-x-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Job</Button>
                </div>
            </div>
        </div>
    );
};

export default JobEditorModal;
