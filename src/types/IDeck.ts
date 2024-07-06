export interface IDeck {
  id: number;
  title: string;
  description: string;
  visibility: 'public' | 'private';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}