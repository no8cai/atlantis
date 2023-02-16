import React from "react"
import "./Footer.css"

const Footer=()=>{
    return(
        <div className="ft-section">
            
            <div className="ft-context">
               <div className="footer-links-labels">
                ABOUT ME
                </div>
                <a href='https://github.com/no8cai' className="footer-links-subcontext" target="_blank">
                <i className="fa-brands fa-github"/> GITHUB
                </a>
                <a href='https://www.linkedin.com/in/eric-chai-b5b9b337/' className="footer-links-subcontext" target="_blank">
                <i className="fa-brands fa-linkedin"/> LINKEDIN
                </a>
                <a href='https://angel.co/u/eric-chai-2' className="footer-links-subcontext" target="_blank">
                <i className="fa-brands fa-angellist"/> WELLFOUND
                </a>
            </div>
            <div className="ft-context">
                <div className="footer-links-labels">
                SUPPORT
                </div>
                <a href='https://github.com/no8cai/atlantis/blob/main/README.md' className="footer-links-subcontext" target="_blank">
                WEBSITE README
                </a>
                <a href='https://github.com/no8cai/atlantis/wiki' className="footer-links-subcontext" target="_blank">
                WEBSITE WIKI
                </a>
            </div>
            <div className="ft-context">
                <div className="footer-links-labels" >
                TECHNOLOGY
                </div>
                <a href='https://www.python.org/' className="footer-links-subcontext" target="_blank">
                PYTHON
                </a>
                <a href='https://flask.palletsprojects.com/en/2.2.x/' className="footer-links-subcontext" target="_blank">
                FLASK
                </a>
                <a href='https://www.sqlalchemy.org/' className="footer-links-subcontext" target="_blank">
                SQLALCHEMY
                </a>
                <a href='https://reactjs.org/' className="footer-links-subcontext" target="_blank">
                REACTJS
                </a>
                <a href='https://www.postgresql.org/' className="footer-links-subcontext" target="_blank">
                POSTGRESQL
                </a>
            </div>

            <div className="ft-context">
                <div className="footer-links-labels" >
                LEARN ABOUT AMAZON
                </div>
                <a href='https://www.amazon.com/' className="footer-links-subcontext" target="_blank">
                OFFICAL AMAZON WEBSITE
                </a>
                </div>
        </div>
    )
}

export default Footer