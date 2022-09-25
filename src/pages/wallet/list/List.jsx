import React, { useState, useEffect } from 'react';
import { HeaderLogo } from 'components/header';

import 'styles/pages/dashboard/dashboard.css';
import 'styles/components/components.css';

import { Link } from "react-router-dom";

import { activeConnectionsList, disconnectWallet } from 'services/blockmateUserService';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function WalletList(){

    const [fetchedData, setFetchedData] = useState([]);
    const [ message, setMessage ] = useState([]);

    function disconnect(provider, account_id){
    
      disconnectWallet(provider, account_id).then( res => {

        const data = res;

        if (data !== undefined && data.statusText === "OK"){
          setMessage(
            <Alert severity="success">
            <AlertTitle>Wallet was disconnect</AlertTitle>
            
            </Alert>
          );
        }else{
          setMessage(
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>     
            </Alert>
    
          );
        }

      }).catch( error => {
          console.log(error);    
      });

    
      setTimeout(() => {
          setMessage("");
          window.location.reload(false);
      }, 3000);
      
    }


    useEffect(() => {

      activeConnectionsList().then( res => {

      const data = res;

      setFetchedData(data);

    }).catch( error => {
        console.log(error);
    });

    }, []);
    
    return (
      
        <>
          <div className="dashboard-main-container">
            <div className="dashboard-navbar">
              <HeaderLogo />
              <div>
                <Link to="/connect"><button className="navbar-add-wallet">+Connect</button></Link>
                <Link to="/"><button className="navbar-add-wallet">×Close</button></Link>
              </div>
            </div>
  
            <br/>
          { message }
            <br/>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Provider</TableCell>
                    <TableCell >Wallet</TableCell>
                    <TableCell >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {fetchedData.data ? fetchedData.data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell align="right"><Button variant="contained" color="error" onClick={() => disconnect(row.name, row.id)}>Disconnect</Button></TableCell>

                    </TableRow>
                  )) : null }
                </TableBody>
              </Table>
            </TableContainer>
         
          </div>
        </>
      );


}

export default WalletList;