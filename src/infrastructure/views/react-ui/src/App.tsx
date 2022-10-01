import React from 'react';
import { Routes, Route, NavLink } from "react-router-dom";

import './App.css';

import { HomePage } from './pages/HomePage';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import logo from './assets/images/logo.png';
import { LandingPage } from './pages/LandingPage';
import {ApiCallExample} from "@infrastructure/views/react-ui/src/pages/ApiCallExample";

function TopBar() {
    return (
      <Box sx={{ flexGrow: 1, margin: '1.5rem 0' }}>
        <Box position="static">
          <Toolbar sx={{ backgroundColor: 'white' , display:'flex', justifyContent:'space-between'}}>
            <Box sx={{display:'flex', alignItems:'center'}} >
                <Box
                component="img"
                sx={{width: '4rem', height: '4rem', margin: '0 1rem'}}
                alt="logo"
                src={logo}
                />
                <Typography
                variant="h4"
                fontWeight="bold"
                noWrap
                textAlign="initial"
                >
                Docker for noob
                </Typography>
            </Box>

            <Box>
                <NavLink to="/"><Button>Formulaire</Button></NavLink>
                <NavLink to="/configurateur" ><Button>Configuration</Button></NavLink>
            </Box>

          </Toolbar>
        </Box>
      </Box>
    );
}

export function App() {
    return (
        <div className="App">
             <TopBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ApiCall" element={<ApiCallExample />} />
                <Route path="/configurateur" element={<HomePage />} />
            </Routes>

        </div>
    );
}


