import { LatLng } from './LatLng.interface';

export interface Address {
    "addressLines": string[],
    "postCode": string,
    "telephone": string,
    "latLng": LatLng
}
