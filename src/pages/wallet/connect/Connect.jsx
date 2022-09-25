import React from 'react';
import { HeaderLogo } from 'components/header';
import ConnectForm  from 'components/wallet/Form';
import { Link } from "react-router-dom";

import 'styles/pages/dashboard/dashboard.css';
import 'styles/components/components.css';


function WalletConnect() {

    return (  
        <>
          <div className="dashboard-main-container">
            <div className="dashboard-navbar">
              <HeaderLogo />
              <div>
                <Link to="/list"><button className="navbar-add-wallet">←Back</button></Link>
                <Link to="/"><button className="navbar-add-wallet">×Close</button></Link>
              </div>
            </div>           
            <ConnectForm/>            
          </div>
        </>
      );
}

export default WalletConnect;