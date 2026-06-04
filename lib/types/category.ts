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

export type UpdateCategoryInput = {
  name: string;
  description: string;
};