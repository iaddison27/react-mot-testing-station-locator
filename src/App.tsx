import { LatLng } from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import AppHeader from './components/AppHeader';
import { PostcodeSearchForm } from './models/PostcodeSearchForm.inteface';
import Results from './components/Results';
import SearchForm from './components/SearchForm';
import './App.css';
import { TestCentre } from './models/TestCentre.interface';
import { TestCentreResultInterface } from './models/TestCentreResultInterface.interface';
import { SearchService } from './services/SearchService';

function App() {

    const searchService = new SearchService();

    const [testCentres, setTestCentres] = useState<TestCentre[]>([]);
    const [error, setError] = useState(false);
    const [testCentreResults, setTestCentreResults] = useState<TestCentreResultInterface[]>([]);
    const [mapCentre, setMapCentre] = useState<LatLng>(new LatLng(55,-2));

    const fetchTestCentresHandler = useCallback(async () => {
        try {
            const response = await fetch('test-centres.json');
            if (!response.ok) {
                throw new Error('Unable to load data, please refresh the page');
            }

            const data = await response.json();
            setTestCentres(data);
        } catch (error: any) {
            setError(error.message);
        }
    }, []);

    const postcodeSearchHandler = (data: PostcodeSearchForm) => {
        searchService.search(data, testCentres).then((results) => {
            setTestCentreResults(results.results);
            setMapCentre(results.postcodeLatLng);
        });
    };

    const nameSearchHandler = (selected: TestCentre) => {
        setTestCentreResults([{
            testCentre: selected,
            distanceKm: 0
        }]);
        setMapCentre(new LatLng(selected.address.latLng.latitude, selected.address.latLng.longitude));
    };

    useEffect(() => {
        fetchTestCentresHandler();
    }, [fetchTestCentresHandler]);

  return (
    <div>
      <AppHeader />
        {error && <div>
          <Alert variant="danger">
              {error}
          </Alert>
      </div>}
        {!error && <Container>
        <SearchForm testCentres={testCentres} postcodeSearchHandler={postcodeSearchHandler} nameSearchHandler={nameSearchHandler}/>
        <Results results={testCentreResults} mapCentre={mapCentre}/>
      </Container>}
    </div>
  );
}

export default App;
