export interface IDeck {
  _id: string;
  title: string;
  description: string;
  visibility: 'public' | 'private';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}