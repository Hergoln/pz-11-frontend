import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface ApiSelectProps {
    resourceEndpoint: string;
    displayNameExtractor: (o: object) => string;
    onSelect: (event: SelectChangeEvent) => void;
    style?: object;
    [x: string]: any;
}

const ApiSelect = ({ resourceEndpoint, displayNameExtractor, onSelect, style, ...selectProps }: ApiSelectProps) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(resourceEndpoint).then(response => {
            setOptions([response.data]); //note: this should be changed to use spread operator (...) when the api data starts returning an array
        });
    }, [resourceEndpoint])

    return (

        <Select onChange={onSelect} style={style} variant="standard" {...selectProps}>
            {
                options?.map((item, index) => {
                    const name = displayNameExtractor(item);
                    return <MenuItem value={name} key={index}>{name}</MenuItem>
                })
            }
        </Select>
    );
};

export default ApiSelect;