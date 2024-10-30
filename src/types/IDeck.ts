export interface IDeck {
  _id: string;
  title: string;
  description: string;
  visibility: 'public' | 'private';
  isDraft?: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}