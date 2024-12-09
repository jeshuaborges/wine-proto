export * from "./base";
export * from "./string";
export * from "./number";
export * from "./date";
export * from "./select";
export * from "./multi-select";
export * from "./range";
export * from "./location";

import { StringFieldType } from "./string";
import { NumberFieldType } from "./number";
import { DateFieldType } from "./date";
import { SelectFieldType } from "./select";
import { MultiSelectFieldType } from "./multi-select";
import { RangeFieldType } from "./range";
import { LocationFieldType } from "./location";
import type { FieldTypeConfig } from "./base";

export function createFieldType(config: FieldTypeConfig) {
  switch (config.type) {
    case "string":
      return new StringFieldType(config);
    case "number":
      return new NumberFieldType(config);
    case "date":
      return new DateFieldType(config);
    case "select":
      return new SelectFieldType(config);
    case "multiSelect":
      return new MultiSelectFieldType(config);
    case "range":
      return new RangeFieldType(config);
    case "location":
      return new LocationFieldType(config);
    default:
      return new StringFieldType(config);
  }
}