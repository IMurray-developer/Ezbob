import React, { createContext, useContext, useState } from "react";
import { State } from "./types";
import { Post, PostResponse, SearchProviderProps } from "./interfaces";
import { fetchData } from "../services/apiService";

const POSTS_PER_PAGE = 10;

const Context = createContext<State | undefined>(undefined);

export const useSearchContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('Search value is undefined. Make sure you use the SearchProvider before using this context')
    }
    return context;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [loadingSearchResults, setLoadingSearchResults] = useState(true);
    const [errorSearchResults, setErrorSearchResults] = useState<string | null>(null);
    const [totalSearchResults, setTotalSearchResults] = useState(0);
    const [searchResults, setSearchResults] = useState<Post[]>([]);

    const getPostByTitle = async (searchTerm: string, page: number = 1) => {
        try {
            setLoadingSearchResults(true)
            const data = await fetchData<PostResponse>(`https://dummyjson.com/posts/search?q=${searchTerm}&limit=${POSTS_PER_PAGE}&skip=${POSTS_PER_PAGE * (page - 1)}`)
            setSearchResults(data.posts);
            setTotalSearchResults(data.total);
        } catch (err: any) {
            setErrorSearchResults(err.message || "There was an error getting the posts");
        } finally {
            setLoadingSearchResults(false)
        }
    }

    const state: State = {
        searchHistory,
        setSearchHistory,
        loadingSearchResults,
        errorSearchResults,
        totalSearchResults,
        searchResults,
        getPostByTitle
    };

    return <Context.Provider value={state}>{children}</Context.Provider>;
};