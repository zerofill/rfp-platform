// FIX: Implement the DocumentStatusWidget to display the status of required document uploads.
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { FieldType, FileValue } from '../types';

const DocumentStatusWidget: React.FC = () => {
    const { schema, profile } = useProfile();

    const documentFields = schema.fields.filter(f => f.type === FieldType.FILE && f.required);

    if (documentFields.length === 0) {
        return null;
    }

    const getStatus = (fieldKey: string, requiresExpiry: boolean): { text: string; color: string; isComplete: boolean } => {
        const value = profile[fieldKey] as FileValue | null;
        if (!value || !value.file) {
            return { text: 'Missing', color: 'text-red-600', isComplete: false };
        }
        if (requiresExpiry && !value.expiryDate) {
            return { text: 'Expiry Date Missing', color: 'text-yellow-600', isComplete: false };
        }
        if (requiresExpiry && value.expiryDate) {
            const expiry = new Date(value.expiryDate);
            if (expiry < new Date()) {
                return { text: 'Expired', color: 'text-red-600', isComplete: false };
            }
        }
        return { text: 'Complete', color: 'text-green-600', isComplete: true };
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Required Documents</h3>
            <ul className="space-y-2">
                {documentFields.map(field => {
                    const status = getStatus(field.key, field.properties?.fileConfig?.requiresExpiry || false);
                    return (
                        <li key={field.key} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{field.label}</span>
                            <span className={`font-medium ${status.color}`}>{status.text}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DocumentStatusWidget;
