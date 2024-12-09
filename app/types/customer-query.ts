import type { SegmentCondition } from "./segment";

export interface CustomerQuery {
  id: string;
  name: string;
  description?: string;
  conditions: SegmentCondition[];
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  matchCount?: number;
  isSaved: boolean;
}

export interface QueryPreview {
  totalMatches: number;
  sampleMatches: Array<{
    id: string;
    name: string;
    email: string;
    matchedConditions: string[];
  }>;
  executionTime: number;
}