import React from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import { styled } from '@mui/system';

import './App.css';

import { HomePage } from './pages/HomePage';
import { Box, Toolbar, Typography, Button, Link } from '@mui/material';
import logo from './assets/images/logo.png';
import { LandingPage } from './pages/LandingPage';
import {ApiCallExample} from "@infrastructure/views/react-ui/src/pages/ApiCallExample";
import { TypeFormatFlags } from 'typescript';




type NavLinkTopBarProps = {
  children: string
  to:string
}

const NavLinkTopBar =  ({children,to}:NavLinkTopBarProps) => (
  <NavLink style={({ isActive }) => ({textDecoration:'none', opacity: isActive ? '1' : '0.6', fontWeight:isActive ? '600' : '400'})} to={to}>
    <Typography sx={{textTransform:'uppercase',textDecoration:'none !important',color:'black',fontSize:'17.5px'}}>
      {children}
    </Typography>
  </NavLink>
)
  

function TopBar() {
    return (
      <Box sx={{ flexGrow: 1, margin: '1.5rem 0' }}>
        <Box position="static">
          <Toolbar sx={{ backgroundColor: 'white' , display:'flex', justifyContent:'space-between', maxWidth:'1480px',width:'90%',margin:'auto'}}>
            <NavLink to="/" style={{textDecoration:'none',color:'black'}} >
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
            </NavLink>

            <Box sx={{display:'flex',gap:2}}>
              <NavLinkTopBar to="/" >
                Home
              </NavLinkTopBar>
              <NavLinkTopBar to="/configurateur">
                Configurateur
              </NavLinkTopBar>
            </Box>
   
          </Toolbar>
        </Box>
      </Box>
    );
}




const Footer = () => {

  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:3,padding:2}}>
      @2022 Tous droits reservés - Docker for Noobs
    </Box>
  )

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
            <Footer />

        </div>
    );
}


