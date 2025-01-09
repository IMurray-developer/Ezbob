import React, { useEffect, useMemo, useState } from 'react';
import './AutocompleteList.css';
import searchIcon from '../../assets/search.svg'
import { useSearchContext } from '../../context/SearchContext';
import { Post, PostResponse } from '../../context/interfaces';
import { fetchData } from '../../services/apiService';
interface Props {
    searchTerm: string;
    handleSearch: (searchTerm?: string) => void;
    display: boolean
}

const AutocompleteList: React.FC<Props> = ({ searchTerm, handleSearch, display }) => {
    const { searchHistory, searchResults, setSearchHistory } = useSearchContext();
    /**
     * * I'm using the extra data because the api is not 
     * * returning a good search result 
     * * Usually on each type I would initiate a call to the database
     * * in order to replicate google behaviour 
     */
    const [data, setData] = useState<string[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            console.log('fetching data ');

            try {
                setLoading(true)
                const data = await fetchData<PostResponse>(`https://dummyjson.com/posts?limit=0`)
                setData(data.posts.map(post => post.title));
            } catch (err: any) {
                setError(err.message || "There was an error getting the posts");
            } finally {
                setLoading(false)
            }
        }
        !data && getData();
    }, []);

    const filteredData = useMemo(() => data?.filter(p => !searchHistory.includes(p)).sort(), [searchHistory, data])

    const suggestions = useMemo(() => {
        if (searchTerm.length === 0) return searchHistory;

        const filteredHistory = searchHistory.filter((term) =>
            term.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        if (filteredHistory.length > 10) {
            return filteredHistory;
        }

        if (!filteredData) {
            return filteredHistory;
        }

        return [...filteredHistory, ...filteredData.filter((term) =>
            term.toLowerCase().startsWith(searchTerm.toLowerCase()))];

    }, [searchTerm, searchHistory, searchResults]);

    const handleRemoveFromHistory = (title: string) => {
        const updatedHistory = searchHistory.filter((item) => item !== title);
        setSearchHistory(updatedHistory);
    };

    if (!display) return null;

    if (error) return <p>There was an error getting suggestions</p>

    return (
        <ul className='autocomplete-list'>
            {suggestions.slice(0, 10).map((title, index) => {
                const startIndex = title.toLowerCase().indexOf(searchTerm.toLowerCase());
                const endIndex = startIndex + searchTerm.length;
                const isVisited = searchHistory.includes(title);
                return (
                    <li key={index} className={ isVisited ? 'visited' : ''}>
                        <div onClick={() => handleSearch(title)}>
                            <img className='search-icon' src={searchIcon} alt="looking-glass" height={16} width={16} />
                            {title.slice(startIndex, endIndex)}
                            <strong>{title.slice(endIndex)}</strong>

                        </div>
                        {isVisited && (
                            <button
                                className="remove-button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleRemoveFromHistory(title)}
                            >
                                Delete
                            </button>
                        )}
                    </li>
                );
            })}
            {loading &&
                <li key={-1}>Loading...</li>
            }
        </ul>
    );
};


export default AutocompleteList;