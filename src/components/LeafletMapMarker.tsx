import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLng } from '../models/LatLng.interface';
import { TestCentre } from '../models/TestCentre.interface';

interface MarkerProps {
    testCentre: TestCentre;
    latLng: LatLng
}

function LeafletMapMarker(props: MarkerProps) {
    return (
        <Marker position={[props.latLng.latitude, props.latLng.longitude]}>
            <Popup>
                <h6>{props.testCentre.name}</h6>
                <div>
                    <span>
                        {props.testCentre.address.addressLines[0]}<br/>
                    </span>
                    {props.testCentre.address.postCode}<br/>
                    {props.testCentre.address.telephone}
                </div>
                <div>Classes Tested: {props.testCentre.classes.join(', ')}</div>
            </Popup>
        </Marker>
    );
}

export default LeafletMapMarker;



