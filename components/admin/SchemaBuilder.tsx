
import React, { useState } from 'react';
import { FormSchema, Field, FieldGroup } from '../../types';
import { useProfile } from '../../hooks/useProfile';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import FieldEditorModal from './FieldEditorModal';

const SchemaBuilder: React.FC = () => {
    const { schema: initialSchema } = useProfile();
    const [schema, setSchema] = useState<FormSchema>(initialSchema);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<Field | null>(null);
    const [currentGroupKey, setCurrentGroupKey] = useState<string>('');

    const handleAddField = (groupKey: string) => {
        setEditingField(null);
        setCurrentGroupKey(groupKey);
        setIsModalOpen(true);
    };

    const handleEditField = (field: Field) => {
        setEditingField(field);
        setCurrentGroupKey(field.groupKey);
        setIsModalOpen(true);
    };

    const handleDeleteField = (fieldKey: string) => {
        if (window.confirm('Are you sure you want to delete this field?')) {
            setSchema(prev => ({
                ...prev,
                fields: prev.fields.filter(f => f.key !== fieldKey),
            }));
        }
    };

    const handleSaveField = (fieldToSave: Field) => {
        if (editingField) {
            // Update existing field
            setSchema(prev => ({
                ...prev,
                fields: prev.fields.map(f => f.key === editingField.key ? fieldToSave : f),
            }));
        } else {
            // Add new field
            const newField = { ...fieldToSave, key: fieldToSave.label.toLowerCase().replace(/\s/g, '_') + '_' + Date.now() };
            setSchema(prev => ({
                ...prev,
                fields: [...prev.fields, newField],
            }));
        }
        setIsModalOpen(false);
        setEditingField(null);
    };
    
    const handleSaveSchema = () => {
        // In a real app, this would be an API call
        console.log("Saving schema:", schema);
        alert("Schema saved to console!");
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Schema Builder</h1>
                    <p className="mt-2 text-gray-600">Manage the fields required for contractor profiles.</p>
                </div>
                <Button onClick={handleSaveSchema}>Save Schema</Button>
            </div>

            <div className="space-y-8">
                {schema.groups.sort((a, b) => a.sortOrder - b.sortOrder).map(group => (
                    <div key={group.key} className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700">{group.name}</h2>
                                <p className="text-sm text-gray-500">{group.description}</p>
                            </div>
                            <Button onClick={() => handleAddField(group.key)} variant="secondary">
                                Add Field
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {schema.fields.filter(f => f.groupKey === group.key).sort((a, b) => a.sortOrder - b.sortOrder).map(field => (
                                <div key={field.key} className="flex items-center p-3 bg-gray-50 rounded-md border">
                                    <Icon name="drag" className="w-5 h-5 text-gray-400 cursor-grab mr-4" />
                                    <div className="flex-grow">
                                        <p className="font-medium text-gray-800">{field.label} {field.required && <span className="text-red-500">*</span>}</p>
                                        <p className="text-xs text-gray-500 uppercase">TYPE: {field.type} | KEY: {field.key}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleEditField(field)} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                                            <Icon name="edit" className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteField(field.key)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100">
                                            <Icon name="delete" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                             {schema.fields.filter(f => f.groupKey === group.key).length === 0 && (
                                 <p className="text-sm text-gray-500 text-center py-4">No fields in this group. Add one to get started.</p>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <FieldEditorModal
                    field={editingField}
                    groupKey={currentGroupKey}
                    onSave={handleSaveField}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default SchemaBuilder;
