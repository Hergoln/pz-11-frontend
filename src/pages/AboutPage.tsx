import React, { Component} from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Menu from '../components/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
// import Image from 'react-image-resizer';


class AboutPage extends Component {

    theme = createTheme();

    Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    render() {
        return (
            <ThemeProvider theme={this.theme}>
            <CssBaseline />
                <Menu />

                <main>
                <Container sx={{ py: 5, px: 20, display: 'flex', flexDirection: 'column',}} maxWidth='xl' style={{alignItems: 'center', justifyContent: 'center', margin: 'auto', textAlign: 'center'}}>
                <img src="https://images.pexels.com/photos/8294660/pexels-photo-8294660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Robot" width="40%" style={{ alignSelf: 'center' }}/>
                <h1 style={{ paddingBottom: 15, paddingTop: 15}} >What can you do in this webapp?</h1>
                
                <p>The main purpose of this app is to make learning AI a little more fun.</p>
                <p>Usually, when you start your journey with neural networks, reinforcement learning or anything
                of that sort there is a lot of theory to take in.</p>
                <p>Then you find an algorithm you want to test. And here is a catch, what problem should this algorithm solve?</p>
                <p>Here you can find already created games with existing api.</p>
                <p>All you need to do is to download api and write code responsible for decision-making, then run it on our server.</p>
                <p>Below there is a detailed description how to do that with an example</p>
                </Container>
                </main>
            </ThemeProvider>
        );
    }
}

export {AboutPage};