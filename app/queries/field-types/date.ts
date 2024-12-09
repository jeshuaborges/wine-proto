import type { FieldType, FieldTypeConfig } from "./base";

export class DateFieldType implements FieldType {
  type = "date";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "equals", label: "Equals" },
      { value: "before", label: "Before" },
      { value: "after", label: "After" },
      { value: "between", label: "Between" },
      { value: "inLast", label: "In Last" }
    ];
  }
}