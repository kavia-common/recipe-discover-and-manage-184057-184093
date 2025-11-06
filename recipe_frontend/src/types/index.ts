export type Recipe = {
  id: string;
  title: string;
  image: string; // local asset path or remote url
  tags: string[];
  timeMinutes: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  description?: string;
};
