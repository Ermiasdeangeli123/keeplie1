export interface Confession {
  id: string;
  text: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  hasLiked?: boolean;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}