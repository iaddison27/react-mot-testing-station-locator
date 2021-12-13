import { DistanceService } from './DistanceService';
import { LatLng } from '../models/LatLng.interface';

const point1: LatLng = { latitude: 55, longitude: -1 };
const point2: LatLng = { latitude: 56.123, longitude: -2.003 };

describe('DistanceService tests', () => {
    const distanceService = new DistanceService();

    test('should return 0 when points have the same latitude and longitude', () => {
        const distanceBetween: number = distanceService.calculateDistance(point1, point1);
        expect(distanceBetween).toBe(0);
    });

    test('should calculate distance in miles between 2 points correctly', () => {
        const distanceBetween: number = distanceService.calculateDistance(point1, point2);
        expect(distanceBetween).toBe(86.9);
    });
});
