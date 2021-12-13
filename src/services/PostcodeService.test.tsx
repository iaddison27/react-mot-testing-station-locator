import fetch from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import { PostcodeService } from './PostcodeService';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

describe('PostcodeService tests', () => {
    const postcodeService = new PostcodeService();

    test('should call the postcode API to convert a postcode to a LatLng', async () => {
        fetch.mockResponseOnce(JSON.stringify({ result: { latitude: 55, longitude: -1.5 } }));

        const latLng = await postcodeService.getLatLng('SW1 1TT');
        expect(latLng).toEqual({latitude: 55, longitude: -1.5})
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://api.postcodes.io/postcodes/SW1 1TT');
    });
});
