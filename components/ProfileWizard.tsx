
import React, { useState, useEffect } from 'react';
import { FormSchema, UserProfile, FieldGroup, FieldValue } from '../types';
import WizardStep from './WizardStep';
import ProgressBar from './ui/ProgressBar';
import Button from './ui/Button';

interface ProfileWizardProps {
  schema: FormSchema;
  initialProfile: UserProfile;
  completeness: number;
  onComplete: (profile: UserProfile) => void;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ schema, initialProfile, completeness, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [profileData, setProfileData] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentCompleteness, setCurrentCompleteness] = useState(completeness);

  const wizardSteps = schema.groups.filter(g => g.isWizardStep).sort((a, b) => a.sortOrder - b.sortOrder);
  const currentStep: FieldGroup = wizardSteps[currentStepIndex];
  const stepFields = schema.fields.filter(f => f.groupKey === currentStep.key);
  
  const isLastStep = currentStepIndex === wizardSteps.length - 1;

  useEffect(() => {
    setCurrentCompleteness(completeness);
  }, [completeness]);
  
  const handleValueChange = (key: string, value: FieldValue) => {
    const newProfileData = { ...profileData, [key]: value };
    setProfileData(newProfileData);
    if(errors[key]) {
      const newErrors = {...errors};
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  const validateStep = (): boolean => {
    const stepErrors: Record<string, string> = {};
    const requiredFields = stepFields.filter(f => f.required);
    
    requiredFields.forEach(field => {
      const value = profileData[field.key];
      let isInvalid = false;
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        isInvalid = true;
      }
      if (typeof value === 'object' && value !== null && 'file' in value && !(value as any).file) {
        isInvalid = true;
      }

      if (isInvalid) {
        stepErrors[field.key] = `${field.label} is required.`;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      if (!isLastStep) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // This is the final "Finish" button click
        onComplete(profileData);
      }
    }
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="p-8 border-b">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Complete Your Contractor Profile</h1>
        <p className="text-gray-600 mt-2">To ensure quality and compliance, please complete your profile. Required fields are marked with an asterisk (*). You won't be able to view or bid on jobs until your profile is 100% complete.</p>
        <div className="mt-6">
          <ProgressBar progress={completeness} />
        </div>
      </div>

      <div className="p-8">
        <WizardStep
          step={currentStep}
          fields={stepFields}
          profileData={profileData}
          errors={errors}
          onValueChange={handleValueChange}
        />
      </div>

      <div className="bg-gray-50 p-6 flex justify-between items-center">
        <div>
          {currentStepIndex > 0 && (
            <Button onClick={handleBack} variant="secondary">
              Back
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{`Step ${currentStepIndex + 1} of ${wizardSteps.length}`}</span>
          <Button onClick={handleNext} disabled={isLastStep && completeness < 100}>
            {isLastStep ? 'Finish & View Jobs' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileWizard;
