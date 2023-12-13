import React, { memo, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Web3Modal from "web3modal";
import { ethers, BigNumber } from "ethers";
import { nft_addess , crowdSale_addess } from "../contract/addresses";
import NFTAbi from "../contract/NFT.json"
import NFTCrowdSale from "../contract/NFTCrowdSale.json"


function Sale(props) {

    const [addr, setAddr] = useState("")

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        } catch (e) {
            console.log("loadProvider default: ", e);
        }
    };

    const AirDrop = async () => {
        try {
            let signer = await loadProvider()
            let NFTSaleContract = new ethers.Contract(nft_addess, NFTAbi, signer)
            // await nFT.addOwner(nFTCrowdSale.address)

            // await nFTCrowdSale.startSale([],nFT.address)
            let airDrop = await NFTSaleContract.addOwner(crowdSale_addess)
            await airDrop.wait();
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const AirDrop2 = async () => {
        try {
            let signer = await loadProvider()
            let NFTSaleContract = new ethers.Contract(crowdSale_addess, NFTCrowdSale, signer)
            let airDrop = await NFTSaleContract.startSale([],nft_addess)
            await airDrop.wait();
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault() 
        AirDrop()
        console.log("hello")
    }

    const handleSubmit2 = (event) => {
        event.preventDefault() 
        AirDrop2()
        console.log("hello")
    }

    const giveUri = () => {
        return "https://ipfs.io/ipfs/QmNkSqqA33kMqoxA4aq4cdUphzEvh8WzkdgL37YjW9z3Af/3"
    }

    console.log("addr", addr)


    return (

        <>

            {props.header}


            <div className="main">

                <Container className="h-100">
                    <Row className="giveaway g-0 justify-content-center">
                        <Col lg={5}>

                            <div className="giveaway-left">

                            </div>

                        </Col>

                        <Col lg={5}>

                            <div className="giveaway-right">

                                <h2>sale</h2>

                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
        
                                        
                                    </Form.Group>
                                    <Button className="custom-btn secondary-btn" onClick={handleSubmit} type="submit">
                                        first call
                                    </Button>
                                </Form>

                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        
                                        
                                    </Form.Group>
                                    <Button className="custom-btn secondary-btn" onClick={handleSubmit2} type="submit">
                                        Second call
                                    </Button>
                                </Form>


                                <div className="py-5">
                                    <ul class="social">

                                        <li>
                                            <a href="#" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                                        </li>

                                        <li>
                                            <a href="#" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                        </li>

                                        <li>
                                            <a href="#" target="_blank"><i class="fa-brands fa-discord"></i></a>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </Col>
                    </Row>
                </Container>

            </div>


            {props.footer}

        </>

    )

}

export default memo(Sale);