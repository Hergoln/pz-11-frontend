import React, { Component} from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Menu from '../components/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';


class AboutPage extends Component {

    theme = createTheme();

    styles = {
        paperContainer: {
            backgroundColor: '#F7F7F7'        
        }
    };

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

                <Paper style={this.styles.paperContainer}>
                <main>
                <Container sx={{ py: 5, px: 20 }} maxWidth='xl'>

                </Container>
                </main>
                </Paper>
            </ThemeProvider>
        );
    }
}

export {AboutPage};