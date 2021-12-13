import { LatLng as LeafletLatLng } from 'leaflet';
import { LatLng } from '../models/LatLng.interface';
import { PostcodeSearchForm } from '../models/PostcodeSearchForm.inteface';
import { PostcodeSearchResultsInterface } from '../models/PostcodeSearchResults.interface';
import { TestCentre } from '../models/TestCentre.interface';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';
import { DistanceService } from './DistanceService';
import { PostcodeService } from './PostcodeService';

export class SearchService {

    private distanceService: DistanceService = new DistanceService();
    private postcodeService: PostcodeService = new PostcodeService();

    public search(data: PostcodeSearchForm, testCentres: TestCentre[]): Promise<PostcodeSearchResultsInterface> {
        return this.postcodeService.getLatLng(data.postcode).then((latLng: LatLng) => {
            const filteredByMotClass = testCentres.filter((centre: TestCentre) => this.testsClass(centre, data.motClass));
            const results: TestCentreResultInterface[] = this.filterByDistance(filteredByMotClass, latLng, data.distance);
            return {
                postcodeLatLng: new LeafletLatLng(latLng.latitude, latLng.longitude),
                results: this.sortByDistance(results)
            };
        });
    }

    private testsClass(centre: TestCentre, motClass: number): boolean {
        return centre.classes.indexOf(motClass) > -1;
    }

    private filterByDistance(centres: TestCentre[], latLng: LatLng, searchRadius: number): TestCentreResultInterface[] {
        const results: TestCentreResultInterface[] = [];
        for (const centre of centres) {
            const distance: number = this.distanceService.calculateDistance(latLng, centre.address.latLng);
            if (distance < searchRadius) {
                results.push(this.createResult(centre, distance));
            }
        }
        return results;
    }

    private createResult(testCentre: TestCentre, distanceKm: number): TestCentreResultInterface {
        return {
            testCentre,
            distanceKm
        };
    }

    private sortByDistance(results: TestCentreResultInterface[]): TestCentreResultInterface[] {
        return results.sort((a, b) => {
            return (a.distanceKm > b.distanceKm) ? 1 : ((b.distanceKm > a.distanceKm) ? -1 : 0);
        });
    }
}
