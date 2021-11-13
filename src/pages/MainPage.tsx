import React, { Component} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography, SpeedDialAction, SpeedDialIcon, SpeedDial} from '@mui/material';
import { Share, Logout, AccountCircle, Analytics } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { JoinGameModal } from '../components/JoinGameModal';
import {CreateGameModal} from '../components/CreateGameModal';
import Menu from '../components/Menu';


class MainPage extends Component {

    theme = createTheme();

    state = {
        joinGameModalVisible: false,
        createGameModalVisible: false
    };

    actions = [
        { icon: <AccountCircle />, name: 'Account' },
        { icon: <Analytics />, name: 'Statistics' },
        { icon: <Logout />, name: 'Logout' },
        { icon: <Share />, name: 'Share' },
      ];

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
                <Container sx={{ py: 5, px: 20 }} maxWidth='xl'>

                <div style={{justifyContent: "center", textAlign: "center", padding: 2}} >
                    <h1 style={{fontSize: 50, padding: 1}}>Create bots. Join battles. </h1>
                    <h2 style={{fontSize: 30}}> Improve your AI skills and have some fun!</h2>
               </div>

                <Divider variant="middle" style={{ paddingBottom: 5, paddingTop: 10}} />
                <CreateGameModal visible={this.state.createGameModalVisible} onCancel={()=>this.setState({createGameModalVisible: false})}/> 
                <Grid container spacing={5} justifyContent="center" style={{ paddingBottom: 30, paddingTop: 30}}>
                    <Grid item xs={3} >
                        <Card onClick={()=>this.setState({createGameModalVisible: true})} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{boxShadow: "0 20px 40px -12px rgba(247,146,86,0.8)", backgroundColor: '#F7F7F7'}}>
                            <CardActionArea style={{backgroundColor: '#F7F7F7', color: '#3F3844'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="200"
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

                    <JoinGameModal visible={this.state.joinGameModalVisible} onCancel={()=>this.setState({joinGameModalVisible: false})}/> 
                    <Grid item xs={3} >
                        <Card onClick={()=>this.setState({joinGameModalVisible: true})} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{boxShadow: "0 20px 40px -12px rgba(0, 178, 202,0.8)", backgroundColor: '#F7F7F7'}}>
                            <CardActionArea style={{backgroundColor: '#F7F7F7', color: '#3F3844'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="200"
                                    image="https://images.unsplash.com/photo-1570455679702-0424bae83b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80" alt="I don't know either"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Join game</Typography>
                                    <Typography> Enter key to already created game ╰(⇀︿⇀)つ-]═───</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={3} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{boxShadow: "0 20px 40px -12px rgba(125, 207, 182,0.8)", backgroundColor: '#F7F7F7'}}>
                            <CardActionArea style={{backgroundColor: '#F7F7F7', color: '#3F3844'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="200"
                                    image="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" alt="Bot"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Get yr bot</Typography>
                                    <Typography> Download already trained bot 🤖 Since we both know you are to lazy to train it yourself.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={3} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} style={{boxShadow: "0 20px 40px -12px rgba(251, 209, 162,0.8)", backgroundColor: '#F7F7F7'}}>
                            <CardActionArea style={{backgroundColor: '#F7F7F7', color: '#3F3844'}}>
                                <CardMedia  component="img" sx={{pt: '5%'}} height="200"
                                    image="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaW5vfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="Games"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">Check out our games</Typography>
                                    <Typography> Browse through currently available games and study them to make bots that maybe can work</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>

                <div style={{justifyContent: "center", textAlign: "center", padding: 25}} >
                <h3 style={{fontSize: 8}}>(Also rage while watching your bot do absolutly the oposite of what you've been teaching that little shit.)</h3>
                </div>

                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {this.actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                    ))}
                </SpeedDial>

                </Container>
                </main>
            </ThemeProvider>
        );
    }
}

export default MainPage;