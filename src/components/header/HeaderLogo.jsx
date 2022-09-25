import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import 'styles/components/components.css';

import { BrowserRouter, Route, Link } from "react-router-dom";

function HeaderLogo() {
  return (
    <>
      <div className="header-logo-wrapper">
      <Link to="/"><Logo className="header-logo-icon" /></Link>
        <h5 className="header-logo-text">NFT Portfolio</h5>
      </div>
    </>
  );
}

export default HeaderLogo;
