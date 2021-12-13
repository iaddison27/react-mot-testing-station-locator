import { LatLng } from '../models/LatLng.interface';

export class DistanceService {

    public calculateDistance(point1: LatLng, point2: LatLng): number {
        const p: number = 0.017453292519943295; // Math.PI / 180
        const c: Function = Math.cos;
        const a = 0.5 - c((point2.latitude - point1.latitude) * p) / 2 +
            c(point1.latitude * p) * c(point2.latitude * p) *
            (1 - c((point2.longitude - point1.longitude) * p)) / 2;

        return this.kmToMiles(12742 * Math.asin(Math.sqrt(a)));
    }

    private kmToMiles(distanceKm: number): number {
        const distanceMiles: number = distanceKm * 0.621371192;
        return Math.round(distanceMiles * 10) / 10;
    }
}
