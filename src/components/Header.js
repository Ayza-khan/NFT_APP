import { Navbar, Container, Nav, NavDropdown,Modal,Image, Button } from "react-bootstrap";
import Logo from "../assets/images/logo.png"
import {useState, useEffect, memo} from "react"
import { Link } from "react-router-dom";
import Jarlathart from "../assets/images/Jarlathart.png";
import Pdf from '../assets/nft_5.pdf';
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
const INFURA_ID = 'a3573077-8a08-483c-b4a0-6a4544c59985'

const setProvider = (type) => {
  window.localStorage.setItem("provider", type);
};


function Header(){
  const [navbar, setNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  useEffect(()=>{
    try {
      activate(connectors.injected);
      setProvider("injected");

      
    } catch (error) {
      console.log(error);
    }
  },[]);

  // useEffect(()=>{
  //   console.log(library);

  // }, [account]);

    return(
        <>

          <Modal
            show={showModal}
            onHide={()=>setShowModal(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Connect Wallet
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{display:'flex', alignItems: 'center', 'border': '1px solid #ccc', 'borderRadius':'16px', 'padding': '10px', 'margin': '3px', 'cursor': 'pointer'}} onClick={()=>{
                try {
                  activate(connectors.injected);
                  setProvider("injected");
                  setShowModal(false);
                } catch (error) {
                  console.log(error);
                }
              }}>
                <Image src="/metamask.png" width={40}/>
                <h6 style={{marginLeft: '20px'}}>Metamask</h6>
              </div>
              <div style={{display:'flex', alignItems: 'center', 'border': '1px solid #ccc', 'borderRadius':'16px', 'padding': '10px', 'margin': '3px', 'cursor': 'pointer'}} onClick={()=>{
                try {
                  activate(connectors.walletConnect);
                  setProvider("walletConnect");
                  setShowModal(false);
                } catch (error) {
                  console.log(error);
                }
              }}>
                <Image src="/walletconnect.png" width={40}/>
                <h6 style={{marginLeft: '20px'}}>WalletConnect</h6>
              </div>
            </Modal.Body>
          
          </Modal>
        
        <Navbar collapseOnSelect expand="lg" className={ navbar ? "custom-nav active" : "custom-nav"}>
            <Container className="justify-content-between">

            <Link to={"/"} className="logo">
                <img src={Jarlathart}/>
            </Link>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{filter:"invert(100%)"}} />
            <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-end">
               
         
                <Nav >
                <Link to={"/"} >Home</Link>
                <Link to={"/about"}>About</Link>
                {/* <Link to={"#"} href="#">Collection</Link> */}
                <Link style={{paddingRight:"10px"}} to={"/faq"} >FAQ</Link>
                <Link style={{paddingRight:"10px"}} to={"#"} onClick={() => window.open(Pdf)}>White Paper</Link>
                {/* <Link to={"/giveaway"} href="#">Give Away</Link> */}

                {
                  account
                  ?
                  <button className="custom-btn primary-btn" onClick={()=>{
                    try {
                      window.localStorage.setItem("provider", undefined);
                      deactivate();
                    } catch(e) {
                      console.log(e);
                    }
                  }}>
                    Disconnect
                  </button>
                  :
                  <button className="custom-btn primary-btn" onClick={() => setShowModal(true)}>
                    Connect
                  </button>
                }
                


                
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        </>

    )



}

export default memo(Header);