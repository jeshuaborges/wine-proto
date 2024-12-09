import { mockSegments } from "~/data/mock-segments";
import type { Segment } from "~/types/segment";

export function getSegmentById(id: string): Segment | undefined {
  return mockSegments.find(segment => segment.id === id);
}