
import React, { useState, useEffect } from 'react';
import { Field, FieldType, FieldOption } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface FieldEditorModalProps {
    field: Field | null;
    groupKey: string;
    onSave: (field: Field) => void;
    onClose: () => void;
}

const FieldEditorModal: React.FC<FieldEditorModalProps> = ({ field, groupKey, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Field>>({
        type: FieldType.TEXT,
        required: false,
        properties: {},
        ...field,
        groupKey: field?.groupKey || groupKey,
    });

    useEffect(() => {
        setFormData({
            type: FieldType.TEXT,
            required: false,
            properties: {},
            ...field,
            groupKey: field?.groupKey || groupKey,
        });
    }, [field, groupKey]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleSave = () => {
        // Basic validation
        if (!formData.label || !formData.type) {
            alert('Label and Type are required.');
            return;
        }
        onSave(formData as Field);
    };

    const renderTypeSpecificProperties = () => {
        if (formData.type === FieldType.SELECT) {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Options (value|label per line)</label>
                    <textarea
                        rows={4}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="value1|Label One&#10;value2|Label Two"
                        value={(formData.properties?.options || []).map(o => `${o.value}|${o.label}`).join('\n')}
                        onChange={e => {
                            const options: FieldOption[] = e.target.value.split('\n').map(line => {
                                const [value, label] = line.split('|');
                                return { value, label: label || value };
                            }).filter(o => o.value);
                            setFormData(prev => ({ ...prev, properties: { ...prev.properties, options } }));
                        }}
                    />
                </div>
            );
        }
        return null;
    }

    const fieldTypeOptions = Object.values(FieldType).map(type => ({ value: type, label: type.toUpperCase() }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{field ? 'Edit Field' : 'Add New Field'}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                        <Input id="label" name="label" type="text" value={formData.label || ''} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Field Type</label>
                        <Select
                            id="type"
                            name="type"
                            value={formData.type || ''}
                            onChange={handleChange}
                            required
                            options={fieldTypeOptions}
                        />
                    </div>
                    {renderTypeSpecificProperties()}
                     <div>
                        <label htmlFor="helpText" className="block text-sm font-medium text-gray-700">Help Text (Optional)</label>
                        <Input 
                          id="helpText" 
                          name="helpText" 
                          type="text" 
                          value={formData.properties?.helpText || ''} 
                          onChange={e => setFormData(prev => ({...prev, properties: {...prev.properties, helpText: e.target.value}}))}
                        />
                    </div>
                    <div className="flex items-center">
                        <input id="required" name="required" type="checkbox" checked={formData.required || false} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="required" className="ml-2 block text-sm text-gray-900">Required Field</label>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 flex justify-end space-x-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Field</Button>
                </div>
            </div>
        </div>
    );
};

export default FieldEditorModal;
