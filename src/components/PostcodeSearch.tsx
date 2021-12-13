import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import styles from './PostcodeSearch.module.css';
import { PostcodeSearchForm } from '../models/PostcodeSearchForm.inteface';

interface PostcodeSearchProps {
    onSearch: (formData: PostcodeSearchForm) => void
}

function PostcodeSearch(props: PostcodeSearchProps) {
    const [formState, setFormState] = useState({
        postcode: '',
        distance: '10',
        motClass: '4',
    });
    const [formValid, setFormValid] = useState(false);

    const updateFormValidity = (postcode: string, distance: string) => {
        setFormValid(postcode.trim().length > 0 && distance.trim().length > 0);
    }

    const postcodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newPostcodeValue = (event.target as HTMLInputElement).value;
        setFormState((prevState) => {
            return { ...prevState, postcode: newPostcodeValue };
        });
        updateFormValidity(newPostcodeValue, formState.distance);
    };

    const distanceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newDistanceValue = (event.target as HTMLInputElement).value;
        setFormState((prevState) => {
            return { ...prevState, distance: newDistanceValue };
        });
        updateFormValidity(formState.postcode, newDistanceValue);
    };

    const motClassChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => {
            return { ...prevState, motClass: (event.target as HTMLInputElement).value };
        });
    };

    const searchHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: PostcodeSearchForm = {
            postcode: formState.postcode,
            distance: +formState.distance,
            motClass: +formState.motClass,
        }
        props.onSearch(data);
    };

    const popover = (
        <Popover id="popover-basic" className={styles.popover} >
            <Popover.Body>
                <dl>
                    <dt>3</dt>
                    <dd>3-wheeled vehicles (up to 450kg unladen weight)</dd>
                </dl>

                <dl>
                    <dt>4</dt>
                    <dd>3-wheeled vehicles (over 450kg unladen weight)</dd>
                    <dd>Cars (up to 8 passenger seats)</dd>
                    <dd>Motor caravans</dd>
                    <dd>Quads (max unladen weight 400kg - for goods vehicles and max net power of 15kw)</dd>
                    <dd>Dual purpose vehicles</dd>
                    <dd>Private hire and public service vehicles (up to 8 seats)</dd>
                    <dd>Ambulances and taxis</dd>
                    <dd>Private passenger vehicles and ambulances (9 to 12 passenger seats)</dd>
                    <dd>Goods vehicles (up to 3,000kg design gross weight)</dd>
                    <dd></dd>
                </dl>

                <dl>
                    <dt>4a</dt>
                    <dd>Class 4 vehicles (9 to 12 passenger seats) with a seat belt installation check</dd>
                </dl>

                <dl>
                    <dt>5</dt>
                    <dd>Private passenger vehicles and ambulances (13 to 16 passenger seats)</dd>
                    <dd>Private passenger vehicles and ambulances (more than 16 passenger seats)</dd>
                    <dd>Playbuses</dd>
                </dl>

                <dl>
                    <dt>5a</dt>
                    <dd>Class 5 vehicles (13 to 16 passenger seats) with a seat belt installation check</dd>
                    <dd>Class 5 vehicles (over 16 passenger seats) with a seat belt installation check</dd>
                </dl>

                <dl>
                    <dt>7</dt>
                    <dd>Goods vehicles (over 3,000kg up to 3,500kg design gross weight)</dd>
                </dl>
            </Popover.Body>
        </Popover>
    );

    return (
        <Form onSubmit={searchHandler}>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control type="text" placeholder="e.g. NE1 1RR" value={formState.postcode} onChange={postcodeChangeHandler} data-testid="postcode" />
                </Col>

                <Col xs="auto">
                    <Form.Label>Search Radius (miles)</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 10" value={formState.distance} onChange={distanceChangeHandler} />
                </Col>

                <Col xs="auto">
                    <Form.Label>
                        MOT Class
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                            <span>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </span>
                        </OverlayTrigger>
                    </Form.Label>
                    <div>
                        <Form.Check inline label="Class 1" name="class" type="radio" id="class1" value="1" checked={formState.motClass === '1'} onChange={motClassChangeHandler}/>
                        <Form.Check inline label="Class 2" name="class" type="radio" id="class2" value="2" checked={formState.motClass === '2'} onChange={motClassChangeHandler}/>
                        <Form.Check inline label="Class 3" name="class" type="radio" id="class3" value="3" checked={formState.motClass === '3'} onChange={motClassChangeHandler}/>
                        <Form.Check inline label="Class 4" name="class" type="radio" id="class4" value="4" checked={formState.motClass === '4'} onChange={motClassChangeHandler}/>
                        <Form.Check inline label="Class 5" name="class" type="radio" id="class5" value="5" checked={formState.motClass === '5'} onChange={motClassChangeHandler}/>
                        <Form.Check inline label="Class 7" name="class" type="radio" id="class7" value="7" checked={formState.motClass === '7'} onChange={motClassChangeHandler}/>
                    </div>
                </Col>

                <Col xs="auto">
                    <Button variant="primary" type="submit" disabled={!formValid}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default PostcodeSearch;
