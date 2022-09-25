import { Link } from "react-router-dom";

function AddWallet() {
  return (
    <>
      <div>
      <Link to="/list"><button className="navbar-add-wallet">+ Connections</button></Link>
      </div>
    </>
  );
}

export default AddWallet;
