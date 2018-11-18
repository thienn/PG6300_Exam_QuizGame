import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>QuizGame - PG6300</h1>
        <NavLink to="/" exact activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/game" activeClassName="is-active">Game</NavLink>
        <NavLink to="/highscore" activeClassName="is-active">Highscore</NavLink>
        <NavLink to="/signup" activeClassName="is-active">Signup</NavLink>
    </header>
);

export default Header;