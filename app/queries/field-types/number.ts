import type { FieldType, FieldTypeConfig } from "./base";

export class NumberFieldType implements FieldType {
  type = "number";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "equals", label: "Equals" },
      { value: "greaterThan", label: "Greater Than" },
      { value: "lessThan", label: "Less Than" },
      { value: "between", label: "Between" }
    ];
  }
}