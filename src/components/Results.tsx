import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { LatLng } from 'leaflet';
import LeafletMap from './LeafletMap';
import ResultList from './ResultList';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';

interface ResultsProps {
    results: TestCentreResultInterface[];
    mapCentre: LatLng
}

function Results(props: ResultsProps) {
    const updatePageResults = () => {
        startIndex = (currentPage - 1) * pageSize;
        endIndex = startIndex + pageSize;
        return props.results.slice(startIndex, endIndex);
    };

    const nthPageHandler = (newPage: number) => {
        setCurrentPage(newPage);
        pageResults = updatePageResults();
    };

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    let startIndex: number;
    let endIndex: number;
    let pageResults: TestCentreResultInterface[] = updatePageResults();

    return (
        <Row>
            <LeafletMap results={pageResults} mapCentre={props.mapCentre}/>
            <ResultList
                pageSize={pageSize}
                currentPage={currentPage}
                totalResults={props.results.length}
                results={pageResults}
                nthPageHandler={nthPageHandler} />
        </Row>
    );
}

export default Results;
