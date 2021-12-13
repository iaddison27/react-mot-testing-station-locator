import { faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './TestCentreResult.module.css';

function TestCentreResult(props: any) {
    return (
        <React.Fragment>
            <Row>
                <Col sm={6}>
                    <h5 className={styles["card-title"]}>{props.testCentre.name}</h5>
                </Col>
                <Col sm={6}>
                    <h6>{props.distanceKm} miles away</h6>
                </Col>
            </Row>
            <Row>
                <Col sm={11}>
                    <address>
                        <FontAwesomeIcon icon={faMapMarker} />
                        &nbsp;
                        {props.testCentre.address.addressLines.map((addressLine: any) => {
                            return addressLine + ', ';
                        })}
                        {props.testCentre.address.postCode}
                        <br/>
                    </address>
                    <FontAwesomeIcon icon={faPhone} /> {props.testCentre.address.telephone}
                </Col>
                <Col sm={1} className={styles.classes}>
                    <h6>Classes</h6>
                    {props.testCentre.classes}
                </Col>
            </Row>
            <hr/>
        </React.Fragment>
    );
}

export default TestCentreResult;
