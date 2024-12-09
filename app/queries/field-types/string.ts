import type { FieldType, FieldTypeConfig } from "./base";

export class StringFieldType implements FieldType {
  type = "string";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "equals", label: "Equals" },
      { value: "contains", label: "Contains" },
      { value: "startsWith", label: "Starts With" },
      { value: "endsWith", label: "Ends With" }
    ];
  }
}