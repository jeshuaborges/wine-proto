import type { FieldType, FieldTypeConfig } from "./base";

export class MultiSelectFieldType implements FieldType {
  type = "multiSelect";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "includes", label: "Includes" },
      { value: "excludes", label: "Excludes" },
      { value: "includesAll", label: "Includes All" },
      { value: "includesAny", label: "Includes Any" }
    ];
  }
}