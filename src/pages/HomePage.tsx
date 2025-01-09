import { useLocation } from "react-router-dom";
import SearchInput from "../components/SearchInput/SearchInput"
import { useEffect } from "react";
import SearchResults from "../components/SearchResults/SearchResults";
import { useSearchContext } from "../context/SearchContext";


const HomePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParams = queryParams.getAll('search');
    const pageParam = parseInt(queryParams.get('page') || '1', 10);
    const {
        getPostByTitle,
        errorSearchResults
    } = useSearchContext();
    
    useEffect(() => {
        if (searchParams.length > 0) {
            getPostByTitle(searchParams.toString(), pageParam);
        }
    }, [])

    if (errorSearchResults) return <p>Error: {errorSearchResults}</p>;

    return (
        <>
            <SearchInput />
            {searchParams.length > 0 && <SearchResults/>
            }
        </>
    )
}

export default HomePage;