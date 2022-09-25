import AddWallet from './add-wallet/AddWallet';
import 'styles/components/components.css';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <AddWallet />
      </div>
    </>
  );
}

export default Navbar;
