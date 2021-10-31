import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';

const { Option } = Select;

interface ApiSelectProps {
    resourceEndpoint: string;
    displayNameExtractor: (o: object) => string;
    onSelect: (value: any) => void;
}

const ApiSelect = ({ resourceEndpoint, displayNameExtractor, onSelect }: ApiSelectProps) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(resourceEndpoint).then(response => setOptions([...response.data]));
    }, [options])

    return (
        <Select onChange={onSelect}>
            {
                options?.map(item => {
                    const name = displayNameExtractor(item);
                    return <Option value={name}>{name}</Option>
                })
            }
        </Select>
    );
};

export default ApiSelect;