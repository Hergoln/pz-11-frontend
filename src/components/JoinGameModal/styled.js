import React from 'react';
import styled from 'styled-components';

export const JoinGameFooterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;


export const StyledGameIdInput = ({ canPlayerJoinGame }) => {
    return (
        <div style={{marginLeft: 10, marginRight: 10}}>
            <input placeholder="Game key..." onChange={canPlayerJoinGame} style={{width: '100%'}} />
        </div>
    );
};