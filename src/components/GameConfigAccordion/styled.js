import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const NoIncrementInput = styled(TextField)`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
`;

export { NoIncrementInput };