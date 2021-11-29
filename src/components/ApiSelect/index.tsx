import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface ApiSelectProps {
    resourceEndpoint: string;
    displayNameExtractor: (o: object) => string;
    onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
    checkThroughKeys?: Array<string>;
    style?: object;
    [x: string]: any;
}

const ApiSelect = ({
    resourceEndpoint,
    displayNameExtractor,
    onSelect,
    style,
    checkThroughKeys,
    ...selectProps
}: ApiSelectProps) => {
    const [options, setOptions] = useState([]);

    const digThrough = (data: object, keys: Array<string>) => {
        let val = data;
        for (var i = 0; i < keys.length; ++i) {
            //@ts-ignore
            val = val[keys[i]];
        }
        return val;
    };

    const resourceGetter = async (resourceEndpoint: string, checkThroughKeys: string[]) => {
        const response = await axios.get(resourceEndpoint);
        //@ts-ignore
        setOptions(checkThroughKeys ? digThrough(response.data, checkThroughKeys) : response.data);
    };

    useEffect(() => {
        //@ts-ignore
        resourceGetter(resourceEndpoint, checkThroughKeys);
    }, []);

    return (
        <TextField
            onChange={onSelect}
            style={style}
            variant="standard"
            select={true}
            {...selectProps}
        >
            {options?.map((item, index) => {
                const name = displayNameExtractor(item);
                return (
                    <MenuItem value={name} key={index}>
                        {name}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default ApiSelect;
