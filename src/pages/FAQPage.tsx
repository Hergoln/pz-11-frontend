import React, { Component} from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Menu from '../components/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

class FAQPage extends Component {
    
    theme = createTheme();

    styles = {
        paperContainer: {
            backgroundImage: `url(${Image})`    
        }
    };

    Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#F7F7F7',
        color: theme.palette.text.secondary,
    }));

    render() {
        return (
            <ThemeProvider theme={this.theme}>
            <CssBaseline />
                <Menu />

                <main style={{backgroundColor: '#F7F7F7'}}>
                <Container sx={{ py: 5, px: 20 }} maxWidth='xl' >
                <h1><b>Frequently Asked Questions</b></h1>
                <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />
                    
                <Grid container spacing={5} justifyContent="center" style={{ paddingBottom: 30, paddingTop: 30}}>
                    <Grid item xs={3} >
                        <img src="https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Question" width="100%"/>
                    </Grid>
                    <Grid item xs={9} >
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#00B2CA'}}/>} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography> Why is it worth my time to learn AI? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            AI solutions become more and more popular, with international companies investing huge amount of time and resources to became more innovative.
                            But more importantly, we both know that you are a little lazy bun with nothing better to do and at least this is not Fortnite or whatever you were planning to do with your wretched life.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#7DCFB6'}}/>} aria-controls="panel2a-content" id="panel2a-header">
                            <Typography>What algorithm is best suited to create bots?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            You can make bots with any algorithm, starting with easier ones like a* and then experimenting further.
                            Be creative, be bold, stop asking stupid questions.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#FBD1A2'}}/>} aria-controls="panel2a-content" id="panel2a-header">
                            <Typography> Will AI take over the world some day? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Maaaan I wish.
                            </Typography>
                            <img src="https://memegenerator.net/img/images/300x300/14050504.jpg" alt="End" width="100%"/>
                            </AccordionDetails>
                        </Accordion>

                        <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#F79256'}}/>} aria-controls="panel2a-content" id="panel2a-header">
                            <Typography> If I will make an AI bot to operate a road roller and it will decide to roal over numerous innocent civillians commiting mass murder will I be hold accountable? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            We will not found out until someone tries :)
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />
                    
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#FBD1A2'}}/>} aria-controls="panel2a-content" id="panel2a-header">
                            <Typography> What can I do if my bot is not learning in a way I designed? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li> Read more about how the algorithm can be adjusted</li>
                                    <li> Contact us for some sugestions in tab 'Contact'</li>
                                    <li> Go to the corner of your room and cry yourself to sleep (recommended)</li>
                                </ul>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#7DCFB6'}}/>} aria-controls="panel2a-content" id="panel2a-header">
                            <Typography> Will AI steal my job? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Yeah, probably.
                            </Typography>
                            <img src="https://i.pinimg.com/originals/73/8e/10/738e10a9c02eb209fe63222b1582ceb0.jpg" alt="End" width="100%"/>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                    
                </Container>
                </main>
            </ThemeProvider>
        );
    }
}

export {FAQPage};