import React from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLng as LeafletLatLng } from 'leaflet';
import { fireEvent, render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import { TestCentre } from '../models/TestCentre.interface';
import LeafletMapMarker from './LeafletMapMarker';

const testCentre: TestCentre = {
    vtsSite: '1',
    name: 'Northern Garages',
    address: {
        addressLines: [],
        postCode: '',
        telephone: '',
        latLng: {latitude: 55, longitude: -1.5}
    },
    classes: [1,2,4]
};

describe('LeafletMapMarker tests', () => {
    test('should display the MOT classes tested', () => {
        const testCentreLatLng = testCentre.address.latLng;
        const mapCentre = new LeafletLatLng(testCentreLatLng.latitude, testCentreLatLng.longitude);
        render(
            <MapContainer center={mapCentre} zoom={8}>
                <LeafletMapMarker testCentre={testCentre} latLng={testCentreLatLng} />
            </MapContainer>
        );

        const mapMarker = screen.getAllByRole('img')[1];
        fireEvent.click(mapMarker);

        const motClasses = screen.getByText('Classes Tested: 1, 2, 4') as TargetElement;
        expect(motClasses).toBeInTheDocument();
    });
});
