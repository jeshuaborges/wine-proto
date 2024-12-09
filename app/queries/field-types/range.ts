import type { FieldType, FieldTypeConfig } from "./base";

export class RangeFieldType implements FieldType {
  type = "range";
  config: FieldTypeConfig;

  constructor(config: FieldTypeConfig) {
    this.config = config;
  }

  getOperators() {
    return [
      { value: "between", label: "Between" },
      { value: "notBetween", label: "Not Between" }
    ];
  }
}