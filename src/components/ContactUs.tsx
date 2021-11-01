import * as React from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material/';
import MessageIcon from '@mui/icons-material/Message';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function ContactUs() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: '#00B2CA' }}>
            <MessageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send a message
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required
                  fullWidth id="firstName" label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name"
                  name="lastName" autoComplete="family-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address"
                  name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="message" label="Message" multiline
                rows={4} type="message" id="message" autoComplete="Save me" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowTerms" color="primary" />}
                  label="I allow to store my email for non-comercial uses."
                />
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Send message
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}