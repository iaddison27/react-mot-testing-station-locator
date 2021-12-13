import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import ResultListPagination from './ResultListPagination';
import { TestCentre } from '../models/TestCentre.interface';

const testCentres: TestCentre[] = [
    { vtsSite: '1', name: 'Northern Garages', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []},
    { vtsSite: '2', name: 'Test Centre', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []},
    { vtsSite: '3', name: 'The Best Garage', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []}
];

describe('ResultListPagination tests', () => {
    test('should render the correct number of pagination buttons', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);

        const page1Button = screen.queryByTestId('page-1-button') as TargetElement;
        const page2Button = screen.queryByTestId('page-2-button') as TargetElement;
        const page3Button = screen.queryByTestId('page-3-button') as TargetElement;
        const page4Button = screen.queryByTestId('page-4-button') as TargetElement;
        expect(page1Button).toBeInTheDocument();
        expect(page2Button).toBeInTheDocument();
        expect(page3Button).toBeInTheDocument();
        expect(page4Button).not.toBeInTheDocument();
    });

    test('should disable the current page button', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);

        const currentPageButton = screen.getByTestId('page-2-button').closest('span');
        expect(currentPageButton).toHaveAttribute('disabled');
    });

    test('should call the pagination handler with the correct new page value - First button', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);
        const firstPageButton = screen.queryByTestId('first-page-button') as TargetElement;
        fireEvent.click(firstPageButton);

        expect(nthPageHandler).toHaveBeenCalledWith(1);
    });

    test('should call the pagination handler with the correct new page value - Previous button', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);
        const previousPageButton = screen.queryByTestId('previous-page-button') as TargetElement;
        fireEvent.click(previousPageButton);

        expect(nthPageHandler).toHaveBeenCalledWith(1);
    });

    test('should call the pagination handler with the correct new page value - Next button', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);
        const nextPageButton = screen.queryByTestId('next-page-button') as TargetElement;
        fireEvent.click(nextPageButton);

        expect(nthPageHandler).toHaveBeenCalledWith(3);
    });

    test('should call the pagination handler with the correct new page value - Last button', () => {
        const nthPageHandler = jest.fn();
        render(<ResultListPagination pageSize={5} currentPage={2} numberOfResults={11} nthPageHandler={nthPageHandler} />);
        const lastPageButton = screen.queryByTestId('last-page-button') as TargetElement;
        fireEvent.click(lastPageButton);

        expect(nthPageHandler).toHaveBeenCalledWith(3);
    });
});
