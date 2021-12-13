import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import NameSearch from './NameSearch';
import { TestCentre } from '../models/TestCentre.interface';

const testCentres: TestCentre[] = [
    { vtsSite: '1', name: 'Northern Garages', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []},
    { vtsSite: '2', name: 'Test Centre', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []},
    { vtsSite: '3', name: 'The Best Garage', address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0} }, classes: []}
];

describe('NameSearch tests', () => {
    test('should display the possible matches when 3 characters are typed', async () => {
        const onSelect = jest.fn();
        render(<NameSearch onSelect={onSelect} testCentres={testCentres}/>);

        const input = screen.queryByRole('combobox') as TargetElement;
        userEvent.type(input, 'gar');

        const items = await screen.findAllByRole('option');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Northern Garages');
    });

    test('should update the selected item when a typeahead option is chosen', async () => {
        const onSelect = jest.fn();
        render(<NameSearch onSelect={onSelect} testCentres={testCentres}/>);

        const input = screen.queryByRole('combobox') as TargetElement;
        userEvent.type(input, 'gar');
        const items = await screen.findAllByRole('option');
        userEvent.click(items[0]);

        expect(onSelect).toHaveBeenCalledWith(testCentres[0]);
    });
});
