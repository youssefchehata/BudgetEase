import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        padding: '20px 0',
        borderTop: 1,
        borderColor: 'divider',
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your company description goes here. We provide awesome services to help you grow your business.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="/" variant="body2" color="text.secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" variant="body2" color="text.secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" variant="body2" color="text.secondary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" variant="body2" color="text.secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: contact@company.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 890
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
