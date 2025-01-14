import { ReactNode } from "react";

export interface SearchProviderProps {
    children: ReactNode;
}
export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  }
  
  export interface PostResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
  }
  