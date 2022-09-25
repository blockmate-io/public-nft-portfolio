import React, { useState, useEffect } from 'react';

import Masonry from 'react-masonry-css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { nftList } from 'services/blockmateUserService';
import AsyncImage from 'components/nft/AsyncImage';


function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function NFTCollection() {

  const [fetchedData, setFetchedData] = useState([]);
  const [ message, setMessage ] = useState([]);

  useEffect(() => {
    
    nftList().then( res => {

      const data = res;
      setFetchedData(data.data.balance_sum);

      if(data.data.balance_sum.length === 0){
        setMessage(
          <Alert severity="error">
          <AlertTitle>No NFTs to show</AlertTitle>  
          <div><a href="./connect">Connect your wallet</a></div> 
          </Alert>
  
        );
      }

  }).catch( error => {
      console.log(error);
  });

  }, []);
  
  const breakpointColumns = {
    default: 3,
    1100: 2,
    800: 1,
  };

    return (
    <>

    { message }
    
    {fetchedData === [] &&  
      <>
        <h1>Loading...</h1>
      </>
    }
    
    <Masonry
      className="nft-collection-container" 
      breakpointCols={breakpointColumns}>
      
      {fetchedData !== [] ? fetchedData.map((row, index) => (

        <>
        { isImage(row.image_url) === true && 
      
          <div key={index} className="nft-collection-item">

            <AsyncImage
              src={row.image_url}
              alt={row.image_name}
            />
            <div className="nft-collection-title">
              <h3>{row.image_name}</h3>
            </div>
          </div>

        }
        </>

      )) : <h2> No NFTs loaded</h2> }    
    </Masonry>

      
      
      
    </>
  );
}

export default NFTCollection;
