import { fireEvent, render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import React from 'react';
import PostcodeSearch from './PostcodeSearch';

describe('PostcodeSearch tests', () => {
    test('should disable the Search button until a postcode is entered', () => {
        const onSearch = jest.fn();
        const { getByText } =render(<PostcodeSearch onSearch={onSearch}/>);
        expect(getByText('Search').closest('button')).toBeDisabled();

        const input = screen.queryByTestId('postcode') as TargetElement;
        fireEvent.change(input, { target: { value: "NE1 1EE" } });

        expect(getByText('Search').closest('button')).toBeEnabled();
    });

    test('should construct the form object correctly when Search is clicked', () => {
        const onSearch = jest.fn();
        const { getByText } =render(<PostcodeSearch onSearch={onSearch}/>);

        const input = screen.queryByTestId('postcode') as TargetElement;
        fireEvent.change(input, { target: { value: "NE1 1EE" } });

        const searchButton = screen.queryByText('Search') as TargetElement;
        fireEvent.click(searchButton)

        expect(onSearch).toHaveBeenCalledWith({
            postcode: 'NE1 1EE',
            distance: 10,
            motClass: 4
        });
    });
});
