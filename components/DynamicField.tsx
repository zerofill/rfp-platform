
import React from 'react';
import { Field, FieldType, FieldValue, RepeaterItem } from '../types';
import Input from './ui/Input';
import Select from './ui/Select';
import FileUpload from './ui/FileUpload';

interface DynamicFieldProps {
  field: Field;
  value: FieldValue;
  error?: string;
  onChange: (value: FieldValue) => void;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ field, value, error, onChange }) => {
  const { type, label, required, properties } = field;

  const renderLabel = () => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const renderField = () => {
    switch (type) {
      case FieldType.TEXT:
        return (
          <Input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={properties?.placeholder}
            hasError={!!error}
          />
        );
      case FieldType.SELECT:
        return (
          <Select
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            options={properties?.options || []}
            hasError={!!error}
          />
        );
      case FieldType.FILE:
        return (
            <FileUpload
                value={value as { file: File | null; expiryDate?: string }}
                onChange={onChange}
                config={properties?.fileConfig}
                hasError={!!error}
            />
        );
      case FieldType.REPEATER:
        const items = (value as RepeaterItem[]) || [];
        const handleAddItem = () => {
            const newItem: RepeaterItem = { id: new Date().toISOString() };
            field.properties?.repeaterFields?.forEach(rf => {
                newItem[rf.key] = '';
            });
            onChange([...items, newItem]);
        };
        const handleRemoveItem = (id: string) => {
            onChange(items.filter(item => item.id !== id));
        };
        const handleItemChange = (id: string, itemKey: string, itemValue: string) => {
            onChange(items.map(item => item.id === id ? { ...item, [itemKey]: itemValue } : item));
        };

        return (
            <div className="md:col-span-2 p-4 border rounded-md bg-gray-50">
                {renderLabel()}
                {properties?.helpText && <p className="text-xs text-gray-500 mt-1 mb-4">{properties.helpText}</p>}
                {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mb-4 border rounded-md bg-white shadow-sm relative">
                        {field.properties?.repeaterFields?.map(rf => (
                             <div key={rf.key} className={rf.key === 'personName' ? 'md:col-span-2' : ''}>
                                <label className="block text-xs font-medium text-gray-600 mb-1">{rf.label} {rf.required && <span className="text-red-500">*</span>}</label>
                                <Input type="text" value={item[rf.key]} onChange={e => handleItemChange(item.id, rf.key, e.target.value)} />
                            </div>
                        ))}
                        <div className="md:col-span-4 flex justify-end">
                            <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                        </div>
                    </div>
                ))}
                 <button type="button" onClick={handleAddItem} className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800">+ Add Personnel</button>
                 {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>
        )

      default:
        return <p>Unsupported field type: {type}</p>;
    }
  };

  if (type === FieldType.REPEATER) {
      return renderField();
  }

  return (
    <div>
      {renderLabel()}
      {renderField()}
      {properties?.helpText && <p className="text-xs text-gray-500 mt-1">{properties.helpText}</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default DynamicField;
