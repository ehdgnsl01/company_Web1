export const CATEGORIES = [
  { value: "category1", label: "Commercial" },
  { value: "category2", label: "Motion Graphic" },
  { value: "category3", label: "Youtube" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
