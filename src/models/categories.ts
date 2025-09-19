export const CATEGORIES = [
  { value: "category1", label: "Commercial" },
  { value: "category2", label: "Youtube" },
  { value: "category3", label: "Motion Graphic" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
