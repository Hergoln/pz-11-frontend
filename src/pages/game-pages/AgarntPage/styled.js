import styled from 'styled-components';
import Box from '@mui/material/Box';

const ScoreDisplay = styled(Box)`
    font-weight: bold;
    font-size: 24px;
    position: absolute;
    display: block;
    width: 100%;
    top: 10px;
    z-index: 9999;
`;

const SessionIDDisplay = styled(Box)`
    display: block;
    position: absolute;
    width: 100%;
    top: 10px;
    text-align: right;
    z-index: 9999;
`;

const PositionDisplay = styled(Box)`
    display: block;
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    z-index: 9999;
`;

export { ScoreDisplay, SessionIDDisplay, PositionDisplay };
