import React from 'react'
import Logo from "../../assests/img/logo-removebg-preview.png"
import './style.css'
import { Link } from 'react-router-dom';


const ClientSidebar = () => {
    return (
        <>
            <div className="sidebar" >
                <Link to="/">
                    <img src={Logo} alt="GeoStation Logo" />
                </Link>
                <ul>
                    <li>
                        <Link to='/ClienttoBuyer'>
                            <i className="fa-solid fa-cart-shopping" />
                        </Link>
                    </li>
                    <li>

                        <Link to='/ClientPanel'>
                            <i className="fas fa-search" title="Search" />{" "}
                        </Link>
                    </li>
                    <li>

                        <Link to='/ClientExposes'>

                            <i className="fa-solid fa-share-from-square" />
                        </Link>
                    </li>
                    <li>

                        <Link to='/ClientAuth'>
                            <i className="fa-solid fa-info" />
                        </Link>
                    </li>
                </ul>
                <div className="separator" />
                <li>
                    <Link to='/Sign'>
                        <i className="fa-solid fa-right-from-bracket" title="Log out" />
                    </Link>
                </li>
            </div>

        </>
    )
}

export default ClientSidebar
