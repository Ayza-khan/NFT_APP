import { Col, Container, Row, Accordion } from "react-bootstrap";
import MainSection from "../components/Mainsection"
import Collection from "../components/Collection"
import Faq from "../components/Faq";
import Team from "../components/Team";
import portfolio from "../assets/images/nftimg1.png"
import Roadmap from "../components/Roadmap";
import banner from "../assets/images/banner1.png"
import { memo, useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import * as smartContract from './contract/ABI.json';
import { ethers } from "ethers";

// import { connectWallet } from "../utils/connectWallet";
// import { useWeb3React } from "@web3-react/core";
// import { ethers, BigNumber } from "ethers";
// import Web3Modal from "web3modal";
// import { nft_addess , crowdSale_addess } from "../contract/addresses";
// import NFTAbi from "../contract/NFT.json"
// import NFTCrowdSale from '../contract/NFTCrowdSale.json'

// import Onboard from 'bnc-onboard';
const INFURA_ID = 'a3573077-8a08-483c-b4a0-6a4544c59985'



function Home(props) {
    
  const {
      library,
      chainId,
      account,
      activate,
      deactivate,
      active
    } = useWeb3React();

    const [isLoading, setLoading] = useState(true);
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);

    const [cost, setCost] = useState(0);


    const mintNft = async () => {
        if(account) {
            setLoading(true);
            try {
                
                const signer = library.getSigner();
                const contract  = new ethers.Contract(smartContract.address, smartContract.abi, library);
                const cs = await contract.cost();
                const options = {value: ethers.utils.parseEther(ethers.utils.formatEther(cs._hex))}
                const contractWithSigner = contract.connect(signer);
                const reciept = await contractWithSigner.mint(account, 1, options);

                initData();
            } catch (error) {
                console.log(error.message);
                alert('Something went wrong');
            }
            setLoading(false);
        }
    }

    const initData = async () => {
      if(account) {
        setLoading(true);
        const signer = library.getSigner();
        const contract  = new ethers.Contract(smartContract.address, smartContract.abi, library);
        const ts = await contract.totalSupply()
        setTotalSupply(parseInt(ts._hex, 16));
        const ms = await contract.maxSupply()
        setMaxSupply(parseInt(ms._hex, 16));
        const cs = await contract.cost();
        setCost(ethers.utils.formatEther(cs._hex));
        setLoading(false);
      }
    }

    useEffect(()=>{

        initData();
      

    }, [account]);

    return(

        <>
        
            {props.header}
           
                


                <div className="main">

                <div className="banner_mage" >
                <img src={banner} className="banner" />
                </div>

                {/* <Collection/> */}

                    <section className="about-section">

                        <Container >
                        <div className="section-title" style={{marginBottom:"5%"}}>
                            <h2>Bark Crypto Pug</h2>
                        </div>
                            <Row>

                                <Col lg={4}>

                                <div>
                                    
                                    <img src={portfolio} className="animate"/>

                                </div>

                                </Col>

                                <Col lg={8}>
                                <div className="right-section">
                                    <div className="heading">
                                        {/* <h3>About Us</h3> */}
                                        <h2>{ isLoading && "Loading....." }</h2>
                                        
                                    </div>
                                    <div style={{textAlign:'right', color: 'white'}}>
                                        <h2><u>Cost : {cost} ETH</u></h2>
                                        <h2>Total Supply : {maxSupply}</h2>
                                        <h2>Minted : {totalSupply}</h2>
                                        <h2>Remaining : {maxSupply - totalSupply}</h2>

                                    </div>
                                   <button disabled={isLoading} className="custom-btn primary-btn" onClick={()=>{mintNft();}} style={{borderRadius:"20px"}}>BUY NFT</button>

                                </div>

                                {/* <p>Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis nostrud exercit
                                        <br/><br/>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                                    nulla pariatur. Excepteur sint occae cat cupidatat non proident, sunt in culpa qui officia 
                                    dese runt mollit anim id est laborum velit esse cillum dolore eu fugiat nulla pariatu epteur sint occaecat</p> */}
                                </Col>
                            </Row>
                        </Container>

                    </section>

                    

                    <Faq/>

                    <Team/>

                    <Roadmap/>

                </div>

            {props.footer}


        </>

    )
}

export default memo(Home);




// const {
//   connector,
//   library,
//   account,
//   chainId,
//   activate,
//   deactivate,
//   active,
//   errorWeb3Modal,
//   active: networkActive, error: networkError, activate: activateNetwork
// } = useWeb3React();
// const [connect, setConnect] = useState(false)

// const loadProvider = async () => {
//   try {
//       const web3Modal = new Web3Modal();
//       const connection = await web3Modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       return provider.getSigner();
//   } catch (e) {
//       console.log("loadProvider default: ", e);
//   }
// };

// const onboard = Onboard({
//   dappId: INFURA_ID, //e5dce034-797e-4871-8a93-ef69730dca19
//   networkId: 3,
//   darkMode: true,
//   subscriptions: {
//     wallet: async (wallet) => {
//       if (wallet.provider) {
//         setConnect(true)
//       } else {
//         setConnect(false)
//       }
//     }
//   },
//   walletSelect: {
//     wallets:[
//       {
//         walletName: "metamask",
//         preferred: true,
//       },
//       {
//         walletName: "trust",
//         preferred: true,
//       },
//       {
//         walletName: 'walletConnect',
//         preferred: true,
//         infuraKey: INFURA_ID,
//         bridge: 'https://bridge.walletconnect.org',
//       },
//       {
//         walletName: 'torus',
//       },
//       {
//         walletName: 'tally',
//       },
//       {
//         walletName: 'status',
//       },
//       {
//         walletName: 'alphawallet',
//       },
//       {
//         walletName: 'atoken',
//       },
//       {
//         walletName: 'blockwallet',
//       },
//       {
//         walletName: 'coinbase',
//       }
//     ]
//   }
// })
// const connectWalletPressed = async () => {
//   let wallet = await onboard.walletSelect();
//   await onboard.walletCheck();
// };

// const CreateToken = async () => {
//   try {
//       connectWalletPressed()
//       let signer = await loadProvider()
//       let NFTSaleContract = new ethers.Contract(crowdSale_addess, NFTCrowdSale, signer)
//       let _value = await NFTSaleContract.getPrice(account)
//       let createToken = await NFTSaleContract.buyNFTV1({value:_value})
//       await createToken.wait();
//   }
//   catch (e) {
//       console.log("error: ", e)
//   }
// }