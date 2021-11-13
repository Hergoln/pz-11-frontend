import React, { Component} from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Menu from '../components/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Divider } from '@mui/material';
import ContactUs from '../components/ContactUs'

class ContactPage extends Component {
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

                <main style={{backgroundColor: '#F7F7F7'}}>
                <Container sx={{ py: 5, px: 20 }} maxWidth='xl'>
                <Grid container spacing={5} justifyContent="center" style={{ paddingBottom: 30, paddingTop: 30}}>
                    <Grid item xs={6} >
                        <h1>How to contact us?</h1>
                        <Divider variant="middle" style={{ paddingBottom: 15, paddingTop: 15}} />

                        <p style={{ paddingBottom: 15, paddingTop: 15}}>You may have some questions regarding the functionalities of this webapp. </p>
                        <p style={{ paddingBottom: 15, paddingTop: 15}}>Or simply your bot is not working in a way you hoped, all tutorials are useless
                            and you are one step away from commiting school shooting from frustration?
                        </p>
                        <p style={{ paddingBottom: 15, paddingTop: 15}}>Worry no more</p>
                        <h2 style={{ paddingBottom: 15, paddingTop: 15}}>You can contact us by compliting form on the right <b>☞☞☞☞</b></h2>
                        <h2 style={{ paddingBottom: 50, paddingTop: 15}}> 🖅&#160;&#160;&#160;&#160;→&#160;&#160;&#160;&#160;
                        👂&#160;&#160;&#160;&#160;🤔&#160;&#160;&#160;&#160;💡&#160;&#160;&#160;&#160;🖅&#160;&#160;&#160;&#160;🍾</h2>
                        <p>If you really have to you can write an email to us: </p>
                        <p>thisIsALegitEmail@gmail.com</p>

                    </Grid>
                    <Grid item xs={6} >
                        <ContactUs />
                    </Grid>
                </Grid>
                </Container>
                </main>
            </ThemeProvider>
        );
    }
}

export {ContactPage};