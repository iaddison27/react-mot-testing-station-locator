import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationProps {
    pageSize: number;
    currentPage: number;
    numberOfResults: number;
    nthPageHandler: (newPage: number) => void;
}

function ResultListPagination(props: PaginationProps) {

    const paginationItems = [];
    const numberOfPages =  Math.ceil(props.numberOfResults / props.pageSize);

    for (let page = 1; page <= numberOfPages; page++) {
        paginationItems.push(
            <Pagination.Item key={page} active={props.currentPage === page} disabled={props.currentPage === page} onClick={() => props.nthPageHandler(page)} data-testid={`page-${page}-button`}>
                {page}
            </Pagination.Item>);
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => props.nthPageHandler(1)} disabled={props.currentPage === 1} data-testid="first-page-button" />
            <Pagination.Prev onClick={() => props.nthPageHandler(props.currentPage - 1)} disabled={props.currentPage === 1} data-testid="previous-page-button" />
            {paginationItems}
            <Pagination.Next onClick={() => props.nthPageHandler(props.currentPage + 1)} disabled={props.currentPage === numberOfPages} data-testid="next-page-button" />
            <Pagination.Last onClick={() => props.nthPageHandler(numberOfPages)} disabled={props.currentPage === numberOfPages} data-testid="last-page-button" />
        </Pagination>
    );
}

export default ResultListPagination;
