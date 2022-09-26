import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, Grid, Paper, Typography } from "@mui/material";
import fusee from "../assets/images/fusee.svg";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={7} align="left" sx={{ alignItems: "center" }}>
          <Box>
            <Typography variant="h2" align="left">
              Configure ton <span>Docker Compose</span> facilement et
              visuellement
            </Typography>
            <Box mt={2}>
                <Typography>
                Tu ne maitrise pas encore Docker ? Notre application
                t’accompagne dans la création de ton fichier de configuration
                Docker avec une interface graphique et un accès a toutes les
                images disponibles de DockerHub.
                </Typography>
            </Box>
            <Box mt={2} mb={2}>
              <Link to="/configurateur">
                <Button variant="contained">Je me fais accompagner</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} sx={{justifyContent:'center',alignItems:'center'}}>
          <img src={fusee} alt="fusée" />
        </Grid>
      </Grid>
    </Container>
  );
}
