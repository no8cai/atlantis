import React from "react"
import "./Footer.css"

const Footer=()=>{
    return(
        <div className="ft-section">
            
            <div className="ft-context">
               <a href='https://github.com/no8cai/atlantis/wiki' className="footer-links-labels">
                ABOUT
                </a>
                </div>
            <div className="ft-context">
                <a href='https://github.com/no8cai/atlantis/blob/main/README.md' className="footer-links-labels">
                SUPPORT
                </a>
                </div>
            <div className="ft-context">
                <a href='https://www.amazon.com/' className="footer-links-labels">
                LEARN ABOUT AMAZON
                </a>
                </div>
        </div>
    )
}

export default Footer