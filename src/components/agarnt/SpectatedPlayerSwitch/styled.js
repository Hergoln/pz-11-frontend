import styled from 'styled-components';
import Box from '@mui/material/Box';

const DecoratedBox = styled(Box)`
    display: block;
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 10px;
`;

const SpectatedPlayerNameText = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export { DecoratedBox, SpectatedPlayerNameText };
