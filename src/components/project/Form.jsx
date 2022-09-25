import * as React from 'react';

import 'styles/pages/dashboard/dashboard.css';
import { useState } from "react";

import axios from "axios"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';
import { HeaderLogo } from 'components/header';


const Form = () => {

  const [projectToken, setProjectToken] = useState("");
  const [ message, setMessage ] = useState([]);

  function onSubmit(e) {
    e.preventDefault()

    //save project token
    localStorage.setItem('projectToken', projectToken);

    //create user for the project
    axios.post("/v1/users",
    {
      "name" : "my-name"
    },
    {
      headers: { 
        'X-API-KEY': `${projectToken}`,
       }
    })
    .then((response) => {    

      console.log("response: "+response.data); 
      
      //uuid
      const uuid = response.data.uuid
      localStorage.setItem('uuid', uuid);


      //refresh
      setTimeout(function(){
        window.location.replace("./connect");
     }, 1000);
        
      }).catch( error => {

        console.log("error")

        setMessage(
          <Alert severity="error">
          <AlertTitle>{ error.response.status }</AlertTitle>     
          </Alert>
        );        
    });
        
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (

    <>
      <div className="dashboard-main-container">
                <div className="dashboard-navbar">
                  <HeaderLogo />  
                </div>
                
          <br/>
          { message }
          <br/>

        <Stack 
            direction={{ xs: 'column', sm: 'column' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Item>
            <div>
                1. <a href="https://portal.blockmate.io/sign-up" target="_tab">Sign-up to Blockmate portal</a>
              </div>
            </Item>
            <Item>
            <div>
                2. Generate Project API key token and copy here:
              </div>
              <div>
              <form onSubmit={onSubmit} >
                <div className="dashboard-main-container">

                  <TextField
                  fullWidth
                  id="projectToken"
                  name="projectToken"
                  label="Project token"
                  value={projectToken}
                  onChange={(e) => setProjectToken(e.target.value)}
                  />
                  <br/><br/>
                  <Button type="submit" variant="contained">Save project token</Button>
                </div>
              </form>
              </div>
            </Item>
        </Stack>
      </div>
    </>
  );
}

export default Form;
