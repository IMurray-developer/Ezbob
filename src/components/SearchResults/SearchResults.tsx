import React from 'react';
import './SearchResults.css';
import { Post } from '../../context/interfaces';
import { useSearchContext } from '../../context/SearchContext';
import linkIcon from '../../assets/link.svg'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

const SearchResults: React.FC = () => {
    const { searchResults, loadingSearchResults, errorSearchResults, totalSearchResults } = useSearchContext();

    if (loadingSearchResults) return <div className='search-results'><p>Loading results...</p></div>;
    if (errorSearchResults) return <p>Error: {errorSearchResults}</p>;

    return (

        <div className='search-results'>
            {searchResults.length > 0 ? searchResults.map((post: Post) => (
                <div key={post.id} className='result-item'>
                    <div className="result-item__icon">
                        {/* Should be post.image*/}
                        <img className='search-icon' src={linkIcon} alt="link" height={16} width={16} />
                    </div>
                    <div className="result-item__content">
                        <div className="result-item__url"></div>
                        <Link to={`/post/${post.id}`} className='result-item__title'>{post.title}</Link>
                        <div className="result-item__description">{post.body.slice(0, 150)}...</div>
                    </div>
                </div>
            )) : (
                <div>
                    <p>No results containing all your search terms were found.</p>

                    <p>Suggestions:</p>
                    <p>Make sure that all words are spelled correctly.<br/>
                    Try different keywords.<br/>
                    Try more general keywords.</p>
                </div>
            )}
            <Pagination />
            <p>Total Results: {totalSearchResults}</p>
            { }
        </div>
    );
};

export default SearchResults;