import userEvent, { TargetElement } from '@testing-library/user-event';
import React from 'react';
import fetch from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { TestCentre } from './models/TestCentre.interface';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

const testCentres: TestCentre[] = [
  {
    vtsSite: '1',
    name: 'Northern Garages',
    address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
    classes: []
  },
  {
    vtsSite: '2',
    name: 'Test Centre',
    address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
    classes: []
  },
  {
    vtsSite: '3',
    name: 'The Best Garage',
    address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 0, longitude: 0 } },
    classes: []
  }
];

test('should display an error if test centre data fails to load', async() => {
  fetch.mockResponseOnce('{ }', { status: 500, headers: { 'content-type': 'application/json' } });

  await act(async () => {
    render(<App/>);
  });

  const errorMessage  =screen.getByText('Unable to load data, please refresh the page');
  expect(errorMessage).toBeInTheDocument();
});

test('should load test centres into typeahead when application loads', async() => {
  fetch.mockResponseOnce(JSON.stringify(testCentres));

  await act(async () => {
    render(<App/>);
  });

  const input = screen.queryByRole('combobox') as TargetElement;
  userEvent.type(input, 'gar');

  const items = await screen.findAllByRole('option');
  expect(items).toHaveLength(2);
  expect(items[0]).toHaveTextContent('Northern Garages');
});

test('should update the results when an item is selected from the typeahead (NameSearch)', async() => {
  fetch.mockResponseOnce(JSON.stringify(testCentres));

  await act(async () => {
    render(<App/>);
  });

  let results = screen.queryAllByRole('heading', { level: 5 });
  expect(results).toHaveLength(0);

  const input = screen.queryByRole('combobox') as TargetElement;
  userEvent.type(input, 'gar');
  const items = await screen.findAllByRole('option');
  userEvent.click(items[0]);

  results = screen.getAllByRole('heading', { level: 5 });
  expect(results).toHaveLength(1);
  expect(results[0].textContent).toBe('Northern Garages');
});

test('should display the result on the map when an item is selected from the typeahead (NameSearch)', async() => {
  fetch.mockResponseOnce(JSON.stringify(testCentres));

  let container: any;
  await act(async () => {
    ({ container } = render(<App/>));
  });

  let mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
  expect(mapMarkers).toHaveLength(0);

  const input = screen.queryByRole('combobox') as TargetElement;
  userEvent.type(input, 'gar');
  const items = await screen.findAllByRole('option');
  userEvent.click(items[0]);

  mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
  expect(mapMarkers).toHaveLength(1);
});
