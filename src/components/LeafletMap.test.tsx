import React from 'react';
import { LatLng as LeafletLatLng } from 'leaflet';
import { render } from '@testing-library/react';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';
import LeafletMap from './LeafletMap';

const results: TestCentreResultInterface[] = [
    {
        testCentre: {
            vtsSite: '1',
            name: 'Northern Garages',
            address: {
                addressLines: [],
                postCode: '',
                telephone: '',
                latLng: { latitude: 55, longitude: -1.5 }
            },
            classes: [1, 2, 4]
        },
        distanceKm: 1
    },
    {
        testCentre: {
            vtsSite: '2',
            name: 'Test Garage 1',
            address: {
                addressLines: [],
                postCode: '',
                telephone: '',
                latLng: { latitude: 55, longitude: -1.6 }
            },
            classes: [1, 2, 7]
        },
        distanceKm: 2
    }
];

describe('LeafletMap tests', () => {
    test('should render markers for all results', () => {
        const testCentreLatLng = results[0].testCentre.address.latLng;
        const mapCentre = new LeafletLatLng(testCentreLatLng.latitude, testCentreLatLng.longitude);
        const { container } = render(<LeafletMap results={results} mapCentre={mapCentre} />);

        const mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
        expect(mapMarkers.length).toBe(2);
    });
});
