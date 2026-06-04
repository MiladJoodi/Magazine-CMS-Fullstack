export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type CreateCategoryInput = {
  name: string;
  description: string;
};

export type CategoryApiError = {
  error: string;
};