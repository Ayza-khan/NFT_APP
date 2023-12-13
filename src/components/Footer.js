import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/images/logo.png"
import {useState, useEffect, memo} from "react"
import { Link } from "react-router-dom";
import Jarlathart from "../assets/images/Jarlathart.png";


function Footer(){

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 500) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    }, []);
  
    // This function will scroll the window to the top 
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
      });
    };

    return(

        <>
        


        <footer>

        {showButton && (
        <div className="to-top">
            <button onClick={scrollToTop}><i class="fa-solid fa-up-long"></i></button>
        </div>
        )}

            <Container>

               <Row>

                   <Col lg={4} className="first-footer">

                    <div  className="footer-logo">
                       <Link to={"/"}> <img src={Jarlathart}/></Link>
                    </div>

                    <p>2022, All rights reserved by Jarlath</p>


                   </Col>

                   <Col lg={4}>

                   </Col>

                   <Col lg={4} className="second-footer">

                    
                    <h4>Follow Us</h4>

                    <ul class="social">
                        <li>
                            <a href="http://twitter.com/jarlathArts" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                        </li>
                        
                        <li>
                            <a href="https://instagram.com/jarlath_arts" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                        </li>

                        <li>
                            <a href="https://discord.gg/S83htFhqMe" target="_blank"><i class="fa-brands fa-discord"></i></a>
                        </li>


                        </ul>

                   </Col>
               </Row>

            </Container>
            <div className="adminbtn">
              <div style={{flex:12}}></div>
              <div style={{flex:1,display:"flex", paddingRight:"20px"}}>
               <Link to={"/giveaway"}><button>Giveaway</button></Link> 
               <Link to={"/sale"}><button>Sale</button></Link> 

              </div>
            </div>
        </footer>

        </>

    )

}

export default memo(Footer);