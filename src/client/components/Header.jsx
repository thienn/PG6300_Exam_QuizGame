import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header className="header">
        <h1>QuizGame - PG6300</h1>
        <NavLink to="/" exact activeClassName="is-active" className="headerItem">Home</NavLink>
        <NavLink to="/highscore" activeClassName="is-active" className="headerItem">Highscore</NavLink>
        <NavLink to="/admin" activeClassName="is-active" className="headerItem">Questions - (admin)</NavLink>
    </header>
);

export default Header;