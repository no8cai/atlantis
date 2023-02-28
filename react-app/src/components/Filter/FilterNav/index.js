import { Link } from "react-router-dom"
import "./FilterNav.css"

const FilterNavBar=()=>{
    return (
        <div className="categories-bar">
        <span>
          <Link to="/discover/Clothing,Shoes" className="Ft-navitem">Clothing, Shoes</Link>
        </span>
        <span>
          <Link to="/discover/Books" className="Ft-navitem">Books</Link>
        </span>
        <span>
          <Link to="/discover/Movies,Music&Games" className="Ft-navitem">Movies, Music & Games</Link>
        </span>
        <span>
          <Link to="/discover/Electronics" className="Ft-navitem">Electronics</Link>
        </span>
        <span>
          <Link to="/discover/Computers" className="Ft-navitem">Computers</Link>
        </span>
        <span>
          <Link to="/discover/Home,Garden&Tools" className="Ft-navitem">Home, Garden & Tools</Link>
        </span>
        <span>
          <Link to="/discover/Toys,Kids&Baby" className="Ft-navitem">Toys, Kids & Baby</Link>
        </span>
        <span>
          <Link to="/discover/Sports" className="Ft-navitem">Sports</Link>
        </span>
        <span>
          <Link to="/discover/Beauty&Health" className="Ft-navitem">Beauty & Health</Link>
        </span>
      </div>
    )
}

export default FilterNavBar