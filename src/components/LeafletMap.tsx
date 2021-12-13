import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './LeafletMap.module.css';
import { TestCentreResultInterface } from '../models/TestCentreResultInterface.interface';
import LeafletMapMarker from './LeafletMapMarker';

interface Results {
    results: TestCentreResultInterface[];
    mapCentre: LatLng
}

interface MapCentreProps {
    mapCentre: LatLng;
}

function UpdateMapCentre(props: MapCentreProps) {
    const map = useMap()
    map.panTo(props.mapCentre);
    return null;
}

function LeafletMap(props: Results) {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const zoom = 11;

    let markerItems: any[] = [];
    if (props.results) {
        markerItems = props.results.map(result => {
            const latLng = result.testCentre.address.latLng;
            return <LeafletMapMarker key={result.testCentre.vtsSite} testCentre={result.testCentre} latLng={latLng} />
        });
    }

    return (
        <div className={styles.container}>
            <MapContainer
                center={props.mapCentre}
                zoom={zoom}
                style={{height: '300px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UpdateMapCentre mapCentre={props.mapCentre} />
                {markerItems}
            </MapContainer>
        </div>
    );
}

export default LeafletMap;
