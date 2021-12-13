import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { TestCentre } from '../models/TestCentre.interface';

interface NameSearchProps {
    onSelect: (selected: TestCentre) => void;
    testCentres: TestCentre[]
}
function NameSearch(props: NameSearchProps) {
    const initialState: Option[] = [];
    const [singleSelections, setSingleSelections] = useState(initialState);

    const selectGarageHandler = (e: Option[]) => {
        if (e[0]) {
            const selected: TestCentre = e[0] as unknown as TestCentre;
            setSingleSelections([e[0]]);
            props.onSelect(selected);
        } else {
            setSingleSelections(initialState);
        }
    }
    return (
        <Form>
            <Form.Group className="mb-12" controlId="formBasicEmail">
                <Form.Label>Garage Name</Form.Label>
                <Typeahead
                    id="garage-name-typeahead"
                    data-testid="garage-name-typeahead"
                    labelKey="name"
                    minLength={3}
                    onChange={selectGarageHandler}
                    // @ts-ignore */
                    options={props.testCentres}
                    placeholder="Enter a garage name..."
                    selected={singleSelections}
                />
            </Form.Group>
        </Form>
    );
}

export default NameSearch;
