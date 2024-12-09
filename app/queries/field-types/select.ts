import type { FieldType, FieldTypeConfig } from "./base";

export class SelectFieldType implements FieldType {
  type = "select";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "equals", label: "Equals" },
      { value: "notEquals", label: "Does Not Equal" }
    ];
  }
}