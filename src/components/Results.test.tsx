import React from 'react';
import { LatLng } from 'leaflet';
import { fireEvent, render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import Results from './Results';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';

const results: TestCentreResultInterface[] = [
    {
        testCentre: {
            vtsSite: '1',
            name: 'Northern Garages',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 5
    },
    {
        testCentre: {
            vtsSite: '2',
            name: 'Test Centre',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 6
    },
    {
        testCentre: {
            vtsSite: '3',
            name: 'The Best Garage',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 10
    },
    {
        testCentre: {
            vtsSite: '4',
            name: 'Test Garage 1',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 11
    },
    {
        testCentre: {
            vtsSite: '5',
            name: 'New Garage',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 15
    },
    {
        testCentre: {
            vtsSite: '6',
            name: 'The Best Test Centre',
            address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
            classes: []
        },
        distanceKm: 20
    },
];

describe('Results tests', () => {
    test('should render results for the initial page', () => {
        render(<Results results={results} mapCentre={new LatLng(55, -1.5)}/>);

        const items = screen.getAllByRole('heading', { level: 5 });
        expect(items).toHaveLength(5);
    });

    test('should update results when the next page button is clicked', () => {
        render(<Results results={results} mapCentre={new LatLng(55, -1.5)}/>);

        const nextPageButton = screen.queryByTestId('next-page-button') as TargetElement;
        fireEvent.click(nextPageButton);

        const items = screen.getAllByRole('heading', { level: 5 });
        expect(items).toHaveLength(1);
        expect(items[0].textContent).toBe('The Best Test Centre');
    });

    test('should render map markers for the initial page of results', () => {
        const { container } = render(<Results results={results} mapCentre={new LatLng(55, -1.5)}/>);

        const mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
        expect(mapMarkers.length).toBe(5);
    });

    test('should update map markers for the next page of results', () => {
        const { container } = render(<Results results={results} mapCentre={new LatLng(55, -1.5)}/>);

        const nextPageButton = screen.queryByTestId('next-page-button') as TargetElement;
        fireEvent.click(nextPageButton);

        const mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
        expect(mapMarkers.length).toBe(1);
    });
});
