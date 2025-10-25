import { useState, useMemo } from 'react';
import { FormSchema, UserProfile, FieldType, FieldValue, FileValue } from '../types';

const MOCK_SCHEMA: FormSchema = {
    groups: [
        { key: 'companyInfo', name: 'Company Information', description: 'Basic details about your company.', sortOrder: 1, isWizardStep: true },
        { key: 'documents', name: 'Licenses & Insurance', description: 'Upload required legal and insurance documents.', sortOrder: 2, isWizardStep: true },
        { key: 'personnel', name: 'Key Personnel', description: 'List the key personnel in your company.', sortOrder: 3, isWizardStep: true },
    ],
    fields: [
        { key: 'companyName', groupKey: 'companyInfo', label: 'Company Name', type: FieldType.TEXT, required: true, sortOrder: 1 },
        { key: 'trade', groupKey: 'companyInfo', label: 'Primary Trade', type: FieldType.SELECT, required: true, sortOrder: 2, properties: { options: [
            { value: '', label: 'Select a trade...' },
            { value: 'plumbing', label: 'Plumbing' },
            { value: 'hvac', label: 'HVAC' },
            { value: 'electrical', label: 'Electrical' },
        ]}},
        { key: 'license', groupKey: 'documents', label: 'Contractor License', type: FieldType.FILE, required: true, sortOrder: 1, properties: { fileConfig: { allowedTypes: ['application/pdf', 'image/jpeg'], maxSizeMB: 5, requiresExpiry: true }}},
        { key: 'insurance', groupKey: 'documents', label: 'General Liability Insurance', type: FieldType.FILE, required: true, sortOrder: 2, properties: { fileConfig: { allowedTypes: ['application/pdf'], maxSizeMB: 10, requiresExpiry: true }}},
        { key: 'keyPersonnel', groupKey: 'personnel', label: 'Key Personnel', type: FieldType.REPEATER, required: false, sortOrder: 1, properties: {
            helpText: 'Add at least one contact person.',
            repeaterFields: [
                { key: 'personName', label: 'Name', required: true },
                { key: 'role', label: 'Role', required: true },
                { key: 'email', label: 'Email', required: false },
            ]
        }}
    ]
};

// Start with a partially filled profile
const MOCK_PROFILE: UserProfile = {
    companyName: 'Reliable Construction',
    trade: 'plumbing',
    license: null,
    insurance: null,
    keyPersonnel: [],
};

export const useProfile = () => {
    const [schema] = useState<FormSchema>(MOCK_SCHEMA);
    const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);

    const updateProfile = (newProfile: UserProfile) => {
        setProfile(newProfile);
    };

    const completeness = useMemo(() => {
        const requiredFields = schema.fields.filter(f => f.required);
        if (requiredFields.length === 0) return 100;

        let completedCount = 0;
        requiredFields.forEach(field => {
            const value: FieldValue = profile[field.key];
            let isComplete = false;

            if (value !== null && value !== undefined && value !== '') {
                 if (field.type === FieldType.FILE) {
                    const fileValue = value as FileValue;
                    if (fileValue.file) {
                        if (field.properties?.fileConfig?.requiresExpiry) {
                            if (fileValue.expiryDate && new Date(fileValue.expiryDate) > new Date()) {
                                isComplete = true;
                            }
                        } else {
                            isComplete = true;
                        }
                    }
                } else {
                    isComplete = true;
                }
            }

            if (isComplete) {
                completedCount++;
            }
        });

        return Math.round((completedCount / requiredFields.length) * 100);

    }, [profile, schema.fields]);


    return { schema, profile, updateProfile, completeness };
};
