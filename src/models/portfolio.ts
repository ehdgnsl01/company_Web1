import type { CategoryValue } from "./categories";

export interface Portfolio {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  date: string;
  year: string;
  client: string;
  category: CategoryValue;
}
