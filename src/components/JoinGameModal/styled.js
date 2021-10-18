import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

import { ReactComponent as KeyIcon } from '../../assets/images/svg/key-icon.svg';

export const JoinGameFooterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;


export const StyledGameIdInput = ({ ...inputProps }) => {
    return (
        <div style={{marginLeft: 10, marginRight: 10}}>
            <Input 
                prefix={ <KeyIcon width={24} height={24} style={{marginRight: 5}}/> } 
                style={{width:'100%'}}
                {...inputProps}
            />
        </div>
    );
};