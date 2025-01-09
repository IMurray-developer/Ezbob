import { useEffect, useRef, useState } from 'react';
import searchIcon from '../../assets/search.svg'
import AutocompleteList from '../AuotocompleteList/AutocompleteList';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../context/SearchContext';
import './SearchInput.css'

const SearchInput = () => {
    const navigate = useNavigate();
    const { searchHistory, setSearchHistory, getPostByTitle } = useSearchContext();
    const [searchInput, setSearchInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search');
        if (query) {
            setSearchInput(query);
            !searchHistory.includes(query) && setSearchHistory([...searchHistory, query])
        } else {
            inputRef.current?.focus();
        }
    }, [])

    const handleSearch = (searchTerm?: string) => {
        searchTerm && setSearchInput(searchTerm);
        const title = searchTerm ? searchTerm : searchInput.trim();
        if (!title) return;
        navigate(`?search=${title}`);
        getPostByTitle(title);
        if (!searchHistory.includes(title)) {
            setSearchHistory([...searchHistory, title].sort());
        }
        setShowSuggestions(false);
        inputRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleFocus = () => setShowSuggestions(true);
    const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

    return (
        <div className={`search${showSuggestions ? ' focused' : ''}`}>
            <div className='search__container'>
                <img className='search-icon' src={searchIcon} alt="looking-glass" height={16} width={16} />
                <input
                    ref={inputRef}
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className='search__input'
                    placeholder='Search...'
                />
            </div>
            <AutocompleteList searchTerm={searchInput} handleSearch={handleSearch} display={showSuggestions} />
        </div>
    );
};

export default SearchInput;