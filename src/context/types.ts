import { Post } from "./interfaces";

export type State = {
    searchHistory: string[];
    setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>
    searchResults: Post[];
    loadingSearchResults: boolean;
    errorSearchResults: string | null;
    totalSearchResults: number;
    getPostByTitle: (searchTerm: string, page?: number) => Promise<void>;
}
