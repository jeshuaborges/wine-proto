export type SegmentChangeType = 
  | 'add' 
  | 'remove' 
  | 'bulk_add' 
  | 'bulk_remove' 
  | 'update' 
  | 'condition_add' 
  | 'condition_remove';

export interface SegmentChange {
  id: string;
  segmentId: string;
  userId: string;
  userName: string;
  type: SegmentChangeType;
  timestamp: string;
  customersAffected: number;
  details?: {
    addedCustomers?: string[];
    removedCustomers?: string[];
    changes?: Record<string, any>;
    condition?: {
      field: string;
      operator: string;
      value: string | number;
      unit?: string;
    };
  };
}

export interface BulkChangePreview {
  addedCustomers: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  removedCustomers: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  statistics: {
    totalAdded: number;
    totalRemoved: number;
    percentageChange: number;
  };
}