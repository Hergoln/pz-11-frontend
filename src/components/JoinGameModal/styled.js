import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

import { ReactComponent as KeyIcon } from '../../assets/images/svg/key-icon.svg';

export const JoinGameFooterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;


export const StyledGameIdInput = ({ canPlayerJoinGame }) => {
    return (
        <div style={{marginLeft: 10, marginRight: 10}}>
        <Input placeholder="Game key..." prefix={ <KeyIcon width={24} height={24} style={{marginRight: 5}}/> } onChange={canPlayerJoinGame} style={{width:'100%'}} />
        </div>
    );
};