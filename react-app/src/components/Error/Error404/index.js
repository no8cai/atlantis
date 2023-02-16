import React from "react"
import "./Error.css"

const Error404page = () => {
    return(
        <div className="error-404sec">
           <div className="error-frist">SORRY</div>
           <div className="error-info">we couldn't find that page</div>
           <div className="error-redirect">
           <span>Try searching or go to </span>
           <span>
           <a href='/' className="error-homepage">
            Atlantis's home page
            </a>
            </span>
           </div>
           <img src='https://images-na.ssl-images-amazon.com/images/G/01/error/94._TTD_.jpg' className="error-dog"/>

        </div>
    )
}

export default Error404page