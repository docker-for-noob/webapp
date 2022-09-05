import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, Search, NavLink } from "react-router-dom";

import './App.css';

import {useAppDispatch} from './hooks/storeHooks';
import {useGetAllArticlesQuery} from "@domain/api/apiSlice";
import {DownloaderService} from "@domain/imageReference/service/downloader/DownloaderService";
import {getError, getResult, isSuccess} from "@domain/utils/maybe/Maybe";
import { HomePage } from './pages/HomePage';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import logo from './assets/images/logo.png';
import { LandingPage } from './pages/LandingPage';

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
                Docker for noobs
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
    const dispatchStore = useAppDispatch();
    const {data} = useGetAllArticlesQuery()
    const {downloadDockerCompose} = DownloaderService

    const download = async () => {
        const result = await downloadDockerCompose("test43", "")
        console.log(result)
        if (isSuccess(result)) console.log(getResult(result))
        if (getError(result)) console.log(getError(result))
    }

    function Test() {
        return (
            <div>
                <button onClick={() => download()}>Download
                    YAML
                </button>
                {JSON.stringify(data)}
            </div>
        )
    }

    return (
        <div className="App">
             <TopBar />
            <Routes>
               
                <Route path="/" element={<LandingPage />} />
                <Route path="/configurateur" element={<HomePage />} />
                <Route path="/test" element={<Test />} />
            </Routes>  
 
        </div>
    );
}


