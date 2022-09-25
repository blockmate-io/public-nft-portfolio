//import axios from 'axios';

import api from "./api";

//connect wallet
export const connectWallet = async (provider, wallet) => {

    try {
        const response = await api.post(
        `/v1/nft/${provider}/connect`,
        {
            'description' : wallet,
            'wallet' : wallet,

        }
        );

        return response;

    } catch(error){
        console.log(error);
        throw new Error('Unable to connect.')
    }    
  
  };



//disconnect wallet
export const disconnectWallet = async (provider, account_id) => {

    try {

        const response = await api.delete(
        `/v1/nft/${provider}/account/${account_id}`,
        {
  
        }
        );

        return response;

    } catch(error){
        console.log(error);
    }    
  
  };



//list of active connections
export const activeConnectionsList = async () => {

    try {

        const response = await api.get(
        `/v1/aggregate/accounts`,
        {
   
        }
        );
    
        return response;

    } catch(error){
        console.log(error);
    }
  
};


//balance list with list of active connections
export const balanceList = async () => {

    try {

        const response = await api.get(
        `/v1/aggregate/balance`,
        {
   
        }
        );
    
        return response;

    } catch(error){
        console.log(error);
    }
  
};



//list NFTs
export const nftList = async () => {

    try {


        const response = await api.get(
       `/v1/aggregate/balance?since=2010-01-01`,
        {
   
        }
        );

        return response;

    } catch(error){
        console.log(error);
    }
  
};