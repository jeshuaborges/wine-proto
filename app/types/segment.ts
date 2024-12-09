export type SegmentType = 'manual' | 'dynamic' | 'template';

export type SegmentOperator = 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in_last';

export interface SegmentCondition {
  field: string;
  operator: SegmentOperator;
  value: string | number | string[] | number[];
  unit?: 'days' | 'months' | 'years' | 'dollars';
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  type: SegmentType;
  conditions: SegmentCondition[];
  customerCount?: number;
  createdAt: string;
  updatedAt: string;
  isTemplate?: boolean;
  templateCategory?: string;
  updateFrequency?: 'manual' | 'daily' | 'weekly' | 'monthly';
}