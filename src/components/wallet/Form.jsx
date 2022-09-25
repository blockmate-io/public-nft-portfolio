import 'styles/pages/dashboard/dashboard.css';

import { connectWallet } from 'services/blockmateUserService';

import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



class ConnectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          wallet: "",
          provider: "eth",
          message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
  
      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({
          [name]: value
        });
      }
  
    handleSubmit(event) {
        
        event.preventDefault();        
        const connection = connectWallet(this.state.provider, this.state.wallet).then( res => {

            this.setState({              
              message: 
                <Alert severity="success">
                <AlertTitle>{this.state.provider} wallet {this.state.wallet} was successfully connected</AlertTitle>     
                </Alert>
              ,wallet: "",
              provider: "eth"           
            },);
        }).catch( error => {
          
            this.setState({message: 
              <Alert severity="error">
               <AlertTitle> Error: Wrong wallet</AlertTitle>     
              </Alert>          
            });
 
        });


    }
  
    render() {
      return (
        
        <>
        <Typography variant="h5">Connect your NFT wallet</Typography>

        <form onSubmit={this.handleSubmit}>
          { this.state.message }
          <br/>
        
          <Select
              labelId="provider-label"
              id="provider"
              name="provider"
              value={this.state.provider}
              label="Provider"
              onChange={this.handleChange}
          >
              <MenuItem value='eth'>ETH</MenuItem>
              <MenuItem value='sol'>SOL</MenuItem>
          </Select>

          &nbsp;&nbsp;

          <TextField
          id="wallet"
          name="wallet"
          label="Wallet"
          value={this.state.wallet}
          onChange={this.handleChange}
          />

          <br/><br/>

          <Button type="submit" variant="contained">Connect</Button>

        </form>

        </>
      );
    }
  }

export default ConnectForm;
