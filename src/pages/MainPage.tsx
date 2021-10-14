import React, { Component} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { QuestionAnswer, Call, Home, Info } from '@mui/icons-material';
import Paper from '@mui/material/Paper';


class MainPage extends Component {

    theme = createTheme();

    styles = {
        paperContainer: {
            backgroundImage: `url(https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)`,
            backgroundSize: "cover"
        
        }
    };

    render() {
        return (
            <ThemeProvider theme={this.theme}>
            <CssBaseline />
                <AppBar position="static" style={{backgroundColor: '#1d4e89', color: '#FFFFFF'}}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Bots battle</Typography>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <Button variant="text" style={{backgroundColor: '#00B2CA', color: '#FFFFFF'}}size="large" endIcon={<Home />}><b>Home</b></Button>
                        <Button variant="text" style={{backgroundColor: '#7DCFB6', color: '#FFFFFF'}} size="large" endIcon={<Call />}><b>About</b></Button>
                        <Button variant="text" style={{backgroundColor: '#FBD1A2', color: '#FFFFFF'}} size="large" endIcon={<Info />}><b>Contact</b></Button>
                        <Button variant="text" style={{backgroundColor: '#F79256', color: '#FFFFFF'}} size="large" endIcon={<QuestionAnswer />}><b>FAQ</b></Button>
                    </Stack>
                </Toolbar>
                </AppBar>
                
                <Paper style={this.styles.paperContainer}>
                <main>
                <Container sx={{ py: 10 }} maxWidth="md" >
                <Grid container spacing={10}>
                    <Grid item xs={5} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea style={{backgroundColor: '#F79256', color: '#FFFFFF'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="140"
                                    image="https://images.unsplash.com/photo-1525711857929-4272fb4a040f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0dGxlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="Battle"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Create new game</Typography>
                                    <Typography>
                                    Choose type of a game and start new battle ☜(ﾟヮﾟ☜)
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={5} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea style={{backgroundColor: '#00B2CA', color: '#FFFFFF'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="140"
                                    image="https://images.unsplash.com/photo-1570455679702-0424bae83b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80" alt="I don't know either"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Join game</Typography>
                                    <Typography>
                                     Enter key to already created game (-■_■)
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={5} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea style={{backgroundColor: '#7DCFB6', color: '#FFFFFF'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="140"
                                    image="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" alt="Bot"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Get yr bot</Typography>
                                    <Typography>
                                    Download already trained bot 🤖 Since we both know you are to lazy to train it yourself.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={5} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea style={{backgroundColor: '#FBD1A2', color: '#FFFFFF'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="140"
                                    image="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaW5vfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="Games"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Checkout our games</Typography>
                                    <Typography>
                                    Browse through currently available games and study them to make bots that maybe can work
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                </Container>
                </main>
                </Paper>
            </ThemeProvider>
        );
    }
}

export default MainPage;