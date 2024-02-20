import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar_name'>
                ИС "Салон Красоты"
            </div>
            <div className='navbar_links'>
                <div className='navbar_link_item'>
                    <Link to="/">Главная страница</Link>
                </div>
                <div className='navbar_link_item'>
                    <Link to="/auth">Аккаунт</Link>
                </div>
            </div>
        </div>
    )

}

export default Navbar;