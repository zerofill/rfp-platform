export enum Role {
  CONTRACTOR = 'contractor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  companyName?: string;
}

export enum FieldType {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  FILE = 'FILE',
  REPEATER = 'REPEATER',
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface RepeaterField {
    key: string;
    label: string;
    required: boolean;
}

export interface RepeaterItem {
  id: string;
  [key: string]: any;
}

export interface Field {
  key: string;
  groupKey: string;
  label: string;
  type: FieldType;
  required: boolean;
  sortOrder: number;
  properties?: {
    placeholder?: string;
    options?: FieldOption[];
    fileConfig?: {
      allowedTypes: string[];
      maxSizeMB: number;
      requiresExpiry: boolean;
    };
    repeaterFields?: RepeaterField[];
    helpText?: string;
  };
}

export interface FieldGroup {
  key: string;
  name: string;
  description: string;
  sortOrder: number;
  isWizardStep: boolean;
}

export interface FormSchema {
  groups: FieldGroup[];
  fields: Field[];
}

export type FileValue = { file: File | null; expiryDate?: string };
export type RepeaterValue = RepeaterItem[];
export type FieldValue = string | string[] | FileValue | RepeaterValue | null | undefined;

export interface UserProfile {
  [key: string]: FieldValue;
}

export enum JobStatus {
  LIVE = 'LIVE',
  AWARDED = 'AWARDED',
  CLOSED = 'CLOSED',
}

export interface Project {
  id: string;
  title: string;
  status: JobStatus;
  location: string;
  dueDate: string;
  postedDate: string;
  trade: string;
  description: string;
}

export interface Bid {
  id: string;
  projectId: string;
  contractorId: string;
  contractorName: string;
  amount: number;
  submittedDate: string;
  message?: string;
  isAwarded: boolean;
}
