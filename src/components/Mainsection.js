import { memo } from "react";
import gif from "../assets/images/giphy.gif"
function MainSection(){

    return(

        <>
        
        <section className="main-gif">

            <img src={gif}/>

        </section>


        </>

    )

}

export default memo(MainSection);