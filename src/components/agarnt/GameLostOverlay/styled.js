import styled from 'styled-components';

const GameLostText = styled.h2`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
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

export { GameLostText, GameLostBigText, GameLostLayout };