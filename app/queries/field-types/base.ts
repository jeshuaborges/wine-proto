export interface FieldType {
  type: string;
  getOperators(): Array<{ value: string; label: string }>;
}

export interface FieldTypeConfig {
  label: string;
  type: string;
  unit?: string;
  options?: Array<{ value: string; label: string }>;
}