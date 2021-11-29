import React from 'react';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { QuestionAnswer, Call, Home, Info } from '@mui/icons-material';
//@ts-ignore
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <AppBar position="static" style={{ backgroundColor: '#FFFFFF', color: '#3F3844' }}>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    <b>Bots battles ⚔</b>
                </Typography>
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button
                        component={Link}
                        to="/"
                        style={{ backgroundColor: '#FFFFFF', color: '#00B2CA' }}
                        size="large"
                        endIcon={<Home />}
                    >
                        <b>Home</b>
                    </Button>
                    <Button
                        component={Link}
                        to="/about/"
                        style={{ backgroundColor: '#FFFFFF', color: '#7DCFB6' }}
                        size="large"
                        endIcon={<Call />}
                    >
                        <b>About</b>
                    </Button>
                    <Button
                        component={Link}
                        to="/contact/"
                        style={{ backgroundColor: '#FFFFFF', color: '#FBD1A2' }}
                        size="large"
                        endIcon={<Info />}
                    >
                        <b>Contact</b>
                    </Button>
                    <Button
                        component={Link}
                        to="/faq/"
                        style={{ backgroundColor: '#FFFFFF', color: '#F79256' }}
                        size="large"
                        endIcon={<QuestionAnswer />}
                    >
                        <b>FAQ</b>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
