import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const GameLostText = styled.h2`
    text-align: center;
    margin-top: 40px;
    font-size: 40px
`;
const GameLostBigText = styled.h1`
    text-align: center;
    font-size: 50px;
    margin-top: 25px;
`;

const GameLostLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonsParent = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    gap: 10px;
    align-items: center;
    width: 50%
`;

const ContentContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const GameLostWindow = styled(Box)`
    display: flex;
    background: white;
    flex-direction: column;
    border: 1px solid black;
    width: 60%;
    height: 50%;
`;

export { GameLostText, GameLostBigText, GameLostLayout, ButtonsParent, ContentContainer, GameLostWindow };