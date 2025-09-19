export const CATEGORIES = [
  { value: "category1", label: "Commercial" },
  { value: "category3", label: "Youtube" },
  { value: "category2", label: "Motion Graphic" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
