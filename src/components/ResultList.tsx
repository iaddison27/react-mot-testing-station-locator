import React from 'react';
import ResultListPagination from './ResultListPagination';
import TestCentreResult from './TestCentreResult';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';

interface Results {
    results: TestCentreResultInterface[];
    currentPage: number;
    pageSize: number;
    totalResults: number;
    nthPageHandler: (newPage: number) => void;
}

function ResultList(props: Results) {
    return (
        <React.Fragment>
            {props.results.map((result: TestCentreResultInterface) =>
                <TestCentreResult key={result.testCentre.vtsSite} testCentre={result.testCentre} distanceKm={result.distanceKm} />
            )}
            <ResultListPagination
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                numberOfResults={props.totalResults}
                nthPageHandler={props.nthPageHandler}/>
        </React.Fragment>
    );
}

export default ResultList;
