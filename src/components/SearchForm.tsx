import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import NameSearch from './NameSearch';
import PostcodeSearch from './PostcodeSearch';
import { PostcodeSearchForm } from '../models/PostcodeSearchForm.inteface';
import styles from './SearchForm.module.css';
import { TestCentre } from '../models/TestCentre.interface';

interface Results {
    testCentres: TestCentre[],
    nameSearchHandler: (selected: TestCentre) => void;
    postcodeSearchHandler: (formData: PostcodeSearchForm) => void;
}

function SearchForm(props: Results) {

    return (
        <Tabs defaultActiveKey="byName" id="uncontrolled-tab-example">
            <Tab eventKey="byName" title="By Name">
                <div className={styles.jumbotron}>
                    <NameSearch testCentres={props.testCentres} onSelect={props.nameSearchHandler}/>
                </div>
            </Tab>
            <Tab eventKey="byPostcode" title="By Postcode">
                <div className={styles.jumbotron}>
                    <PostcodeSearch onSearch={props.postcodeSearchHandler} />
                </div>
            </Tab>
        </Tabs>
    );
}

export default SearchForm;
