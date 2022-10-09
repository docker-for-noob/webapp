import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import fusee from "../assets/images/fusee.svg";
import { Link } from "react-router-dom";
import ContainerCustom from "./HomePage";

export function LandingPage() {

  const theme = useTheme()

  return (
    <ContainerCustom>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} sx={{ display:'flex',alignItems:'center'}}>
          <Box sx={{maxWidth:'500px'}}>
            <Typography variant="h1" align="left">
              Configure ton <span style={{color:theme.palette.primary.main}}>Docker Compose</span> facilement et
              visuellement
            </Typography>
            <Box mt={2}>
                <Typography variant="body1">
                Tu ne maitrises pas encore Docker ? Notre application
                t’accompagne dans la création de ton fichier de configuration
                Docker avec une interface graphique et un accès a toutes les
                images disponibles de DockerHub.
                </Typography>
            </Box>
            <Box mt={2} mb={2}>
              <Link to="/configurateur" style={{textDecoration:'none'}}>
                <Button variant="contained">Je me fais accompagner</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <img src={fusee} alt="fusée" />
        </Grid>
      </Grid>
    </ContainerCustom>
  );
}
