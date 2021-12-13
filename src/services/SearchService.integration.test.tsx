import fetch from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import { SearchService } from './SearchService';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

const testCentres = [
    {
        vtsSite: '1',
        name: 'Test Centre A',
        address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 55, longitude: -1.5 } },
        classes: [1, 2]
    },
    {
        vtsSite: '2',
        name: 'Test Centre B',
        address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 55, longitude: -1.4 } },
        classes: [1, 2, 4]
    },
    {
        vtsSite: '3',
        name: 'Test Centre C',
        address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 55, longitude: -1.3 } },
        classes: [4]
    },
    {
        vtsSite: '4',
        name: 'Test Centre D',
        address: { addressLines: [], postCode: '', telephone: '', latLng: { latitude: 55, longitude: -1.2 } },
        classes: [4, 5]
    }
];

describe('SearchService integration tests', () => {
    const searchService = new SearchService();

    test('should return empty array when no results for supplied class', async () => {
        fetch.mockResponseOnce(JSON.stringify({ result: { latitude: 55, longitude: -1.5 } }));

        const postcodeSearchObject = {
            postcode: 'NE1 1EE',
            distance: 8,
            motClass: 3
        };
        const searchResults = await searchService.search(postcodeSearchObject, testCentres);
        expect(searchResults.results.length).toBe(0);
    });

    test('should return empty array when no results within specified distance', async () => {
        fetch.mockResponseOnce(JSON.stringify({ result: { latitude: 55, longitude: -1.5 } }));

        const postcodeSearchObject = {
            postcode: 'NE1 1EE',
            distance: 3,
            motClass: 4
        };
        const searchResults = await searchService.search(postcodeSearchObject, testCentres);
        expect(searchResults.results.length).toBe(0);
    });

    test('should return correct results based on distance and MOT class', async () => {
        fetch.mockResponseOnce(JSON.stringify({ result: { latitude: 55, longitude: -1.5 } }));

        const postcodeSearchObject = {
            postcode: 'NE1 1EE',
            distance: 8,
            motClass: 4
        };
        const searchResults = await searchService.search(postcodeSearchObject, testCentres);
        expect(searchResults.results.length).toBe(2);
        expect(searchResults.results[0].testCentre.name).toBe('Test Centre B');
        expect(searchResults.results[1].testCentre.name).toBe('Test Centre C');
    });

    test('should return results sorted by distance ascending', async () => {
        fetch.mockResponseOnce(JSON.stringify({ result: { latitude: 55, longitude: -1.5 } }));

        const postcodeSearchObject = {
            postcode: 'NE1 1EE',
            distance: 8,
            motClass: 4
        };
        const searchResults = await searchService.search(postcodeSearchObject, testCentres);
        const arrayInOrder = searchResults.results.slice(1).every((e,i) => e.distanceKm > searchResults.results[i].distanceKm);
        expect(arrayInOrder).toBe(true);
    });
});
