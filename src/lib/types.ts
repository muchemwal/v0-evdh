
// Core types for the EV Data Hub platform

// Base entity with common properties
export interface BaseEntity {
  id: string;
  name: string;
  description: string;
  created: Date;
  lastModified: Date;
  createdBy: string;
  lastModifiedBy: string;
}

// Data classifications for sensitivity and use case
export enum DataClassification {
  PII = "PII",
  PHI = "PHI",
  TELEMETRY = "Telemetry",
  DIAGNOSTIC = "Diagnostic",
  OPERATIONAL = "Operational",
  FINANCIAL = "Financial",
  CONFIDENTIAL = "Confidential",
  PUBLIC = "Public",
}

// Governance approval states
export enum ApprovalStatus {
  DRAFT = "Draft",
  PENDING_REVIEW = "Pending Review",
  UNDER_REVIEW = "Under Review",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

// Data source types for connectivity
export enum DataSourceType {
  DATABASE = "Database",
  API = "API",
  STREAMING = "Streaming",
  FILE_SYSTEM = "File System",
  SaaS = "SaaS",
  IOT_DEVICE = "IoT Device",
  VEHICLE = "Vehicle",
  CHARGING_STATION = "Charging Station",
}

// Architecture layers from TOGAF
export enum ArchitectureLayer {
  BUSINESS = "Business",
  APPLICATION = "Application",
  DATA = "Data",
  TECHNOLOGY = "Technology",
}

// Roles for RBAC
export enum UserRole {
  VIEWER = "Viewer",
  CONTRIBUTOR = "Contributor",
  STEWARD = "Steward",
  OWNER = "Owner",
  ARCHITECT = "Architect",
  ADMIN = "Admin",
}

// Data asset for the catalog
export interface DataAsset extends BaseEntity {
  type: string;
  classification: DataClassification[];
  ownerEmail: string;
  stewardEmail: string;
  businessDomain: string;
  approvalStatus: ApprovalStatus;
  sourceSystem: string;
  tags: string[];
  uri: string;
}

// Data source system
export interface DataSource extends BaseEntity {
  type: DataSourceType;
  connectionDetails: Record<string, any>;
  ownerEmail: string;
  healthStatus: string;
  lastSyncTime: Date | null;
  assetCount: number;
}

// Architecture entity model
export interface ArchitectureEntity extends BaseEntity {
  layer: ArchitectureLayer;
  relationships: Relationship[];
  capabilities: string[];
  modelType: string;
  metadata: Record<string, any>;
}

// Relationship between entities
export interface Relationship {
  sourceId: string;
  targetId: string;
  type: string;
  metadata: Record<string, any>;
}

// Workflow for governance
export interface WorkflowInstance extends BaseEntity {
  workflowType: string;
  status: ApprovalStatus;
  currentStep: string;
  entityId: string;
  entityType: string;
  history: WorkflowStep[];
  dueDate: Date | null;
}

// Step in a workflow
export interface WorkflowStep {
  stepName: string;
  assignee: string;
  status: ApprovalStatus;
  comments: string;
  completedDate: Date | null;
}

// User profile with roles
export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  permissions: string[];
  departments: string[];
}

// API for managing connections
export interface ConnectionAPI {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  authType: string;
  version: string;
  documentation: string;
  status: string;
}
