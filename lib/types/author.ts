export type Author = {
  id: string;
  slug: string;
  name: string;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type createAuthorInput = {
  name: string;
  bio?: string | null;
}