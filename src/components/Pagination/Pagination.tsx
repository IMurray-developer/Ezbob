import React, { useMemo } from 'react';
import './Pagination.css';
import { useSearchContext } from '../../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';

const POSTS_PER_PAGE = 10;

const Pagination: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const query = params.get('search') || '';
    const pageParam = parseInt(params.get('page') || '1', 10);
    const { totalSearchResults, getPostByTitle } = useSearchContext();

    const totalPages = useMemo(() => Math.ceil(totalSearchResults / POSTS_PER_PAGE), [totalSearchResults]);

    const pages = useMemo(() => 
        pageParam < 10 ?  
        Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10) : 
        Array.from({ length: totalPages }, (_, i) => i + 1).slice(pageParam - 5, pageParam + 4), [totalPages, pageParam]);

    const onPageChange = (newPage: number) => {
        if (newPage === pageParam) return; 
        params.set('page', newPage.toString());
        navigate(`?${params.toString()}`);
        getPostByTitle(query, newPage);
    };

    return (
        <div className='pagination'>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={p === pageParam ? 'active' : ''}
                    disabled={p === pageParam}
                >
                    {p}
                </button>
            ))}
            {pageParam < totalPages && (
                <button onClick={() => onPageChange(pageParam + 1)}>Next</button>
            )}
        </div>
    );
};

export default Pagination;
