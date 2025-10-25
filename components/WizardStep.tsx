
import React from 'react';
import { FieldGroup, Field, UserProfile, FieldValue } from '../types';
import DynamicField from './DynamicField';

interface WizardStepProps {
  step: FieldGroup;
  fields: Field[];
  profileData: UserProfile;
  errors: Record<string, string>;
  onValueChange: (key: string, value: FieldValue) => void;
}

const WizardStep: React.FC<WizardStepProps> = ({ step, fields, profileData, errors, onValueChange }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700">{step.name}</h2>
      <p className="text-gray-500 mt-1 mb-8">{step.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {fields.sort((a, b) => a.sortOrder - b.sortOrder).map(field => (
          <DynamicField
            key={field.key}
            field={field}
            value={profileData[field.key]}
            error={errors[field.key]}
            onChange={(value) => onValueChange(field.key, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default WizardStep;
