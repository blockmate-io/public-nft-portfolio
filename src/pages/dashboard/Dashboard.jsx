import { HeaderLogo } from 'components/header';
import { Navbar } from 'components/navbar';
import { NFTCollection } from 'components/nft';
import 'styles/pages/dashboard/dashboard.css';
import Form from 'components/project/Form';



function Dashboard() {


  //setup project and create new user
  if(localStorage.uuid == null) {
    return (
      <>
        <Form />
      </>
    );


 }else{


    return (
      
      <>
        <div className="dashboard-main-container">
          <div className="dashboard-navbar">
            <HeaderLogo />
            <Navbar />
          </div>

            <NFTCollection />


        </div>
      </>
    );
  }
}

export default Dashboard;
