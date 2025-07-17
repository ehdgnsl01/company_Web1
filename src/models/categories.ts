export const CATEGORIES = [
  { value: 'category1', label: '분류1' },
  { value: 'category2', label: '분류2' },
  { value: 'category3', label: '분류3' },
  { value: 'category4', label: '분류4' },
] as const;

export type CategoryValue = typeof CATEGORIES[number]['value'];