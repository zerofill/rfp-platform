
import React, { useRef } from 'react';
import Input from './Input';
import Icon from './Icon';

interface FileUploadProps {
    value: { file: File | null; expiryDate?: string } | null;
    onChange: (value: { file: File | null; expiryDate?: string }) => void;
    config?: {
        allowedTypes: string[];
        maxSizeMB: number;
        requiresExpiry: boolean;
    };
    hasError?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ value, onChange, config, hasError }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onChange({ file, expiryDate: value?.expiryDate || '' });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ file: value?.file || null, expiryDate: event.target.value });
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div className="space-y-2">
            <div className={`flex items-center space-x-2 w-full p-2 border rounded-md ${hasError ? 'border-red-500' : 'border-gray-300'}`}>
                <button type="button" onClick={triggerFileSelect} className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-md">
                    Choose File
                </button>
                <div className="flex-grow text-sm text-gray-500 truncate flex items-center space-x-2">
                    {value?.file ? <Icon name="file" className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <Icon name="upload" className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                    <span className="truncate">{value?.file ? value.file.name : 'No file selected.'}</span>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={config?.allowedTypes.join(',')}
                />
            </div>
            {value?.file && config?.requiresExpiry && (
                <div className="pl-2">
                    <label className="text-xs font-medium text-gray-600">Expiry Date*</label>
                    <Input
                        type="date"
                        value={value.expiryDate || ''}
                        onChange={handleDateChange}
                        hasError={hasError && !value.expiryDate}
                    />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
