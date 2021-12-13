import { LatLng } from 'leaflet';
import { TestCentreResultInterface } from './TestCentreResultInterface.interface';

export interface PostcodeSearchResultsInterface {
    postcodeLatLng: LatLng,
    results: TestCentreResultInterface[]
}
