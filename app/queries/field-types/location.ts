import type { FieldType, FieldTypeConfig } from "./base";

export class LocationFieldType implements FieldType {
  type = "location";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "equals", label: "Equals" },
      { value: "contains", label: "Contains" },
      { value: "startsWith", label: "Starts With" },
      { value: "inRadius", label: "Within Distance" },
      { value: "notInRadius", label: "Outside Distance" },
      { value: "inState", label: "In State" },
      { value: "notInState", label: "Not In State" }
    ];
  }
}