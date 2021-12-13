import { LatLng } from '../models/LatLng.interface';

export class PostcodeService {

    public async getLatLng(postcode: string): Promise<LatLng> {
        const url: string = 'http://api.postcodes.io/postcodes/' + postcode;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            return {
                latitude: data.result.latitude,
                longitude: data.result.longitude
            }
        } catch (error) {
            //setError(error.message);
        }
        return {
            latitude: 0,
            longitude: 0
        };
    }
}
