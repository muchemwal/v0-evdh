
import { DataClassification } from './types';

// Cloud providers
export type CloudProvider = 'aws' | 'azure' | 'gcp' | 'palantir';

// Asset types
export type AssetType = 'stream' | 'database' | 'api' | 'dataset';

// Data asset interface
export interface DataAsset {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  domain: string;
  classification: DataClassification[];
  cloudPlatform: CloudProvider;
  owner: string;
  ownerId?: string;
  lastUpdated: string;
  createdAt?: string;
}

// Access request status
export enum AccessRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Access request interface
export interface AccessRequest {
  id: string;
  assetId: string;
  requestorId: string;
  requestorName: string;
  purpose: string;
  accessLevel: string;
  status: AccessRequestStatus;
  reviewerId?: string;
  reviewerName?: string;
  requestDate: string;
  decisionDate?: string;
  expirationDate?: string;
  comments?: string;
}

// Workflow status
export type WorkflowStatus = "completed" | "in-progress" | "pending" | "rejected";

// Workflow type
export type WorkflowType = "access" | "approval" | "governance";

// Workflow interface
export interface Workflow {
  id: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  owner: string;
  createdAt: string;
  dueDate?: string;
  assetId?: string;
  assetName?: string;
  cloudPlatform?: string;
  workflowType: WorkflowType;
}

// User role
export enum UserRole {
  ADMIN = 'admin',
  DATA_STEWARD = 'data_steward',
  DATA_ENGINEER = 'data_engineer',
  ANALYST = 'analyst',
  VIEWER = 'viewer'
}
